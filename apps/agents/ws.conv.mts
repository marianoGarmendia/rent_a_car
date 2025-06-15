import express from "express";
import WebSocket ,{ WebSocketServer } from "ws";
import http from "http";
import cors from "cors";
import { isArray } from "lodash-es";
import { graph } from "./src/rent-a-car-agent/graph.js";
import { SYSTEM_PROMPT_TEMPLATE } from "./src/rent-a-car-agent/prompts.js";



const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const connectedClients = new Set<WebSocket>();


// Endpoint custom para elevenlabs conversationl
const threadLocks = new Map<string, boolean>();

app.post("/v1/chat/completions", async (req, res) => {
  const { messages, stream } = req.body;
  const last_message = messages.at(-1);
 

  

  if (last_message.role !== "user") {
    res.write(
      `event: error\ndata: ${JSON.stringify({
        message: "El último mensaje debe ser del usuario",
      })}\n\n`
    );
    res.write("data: [DONE]\n\n");
    return;
  }

  if (!stream) {
    res.status(400).json({ error: "Solo soporta stream=true" });
    return;
  }
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

    // En tu handler de /chat/completions
    req.on("close", (e:any) => {
      console.log("[SSE] Cliente/proxy cerró la conexión");
      console.log("[SSE] Close:", e);
      threadLocks.set(thread_id, false);
      
    });
    res.on("error", (err) => {
      console.error("[SSE] Error en el stream:", err);
    });

  const heartbeat = setInterval(() =>     res.write(`: ping\n\n`), 2000);


  const thread_id = "149";
  if (threadLocks.get(thread_id)) {
    clearInterval(heartbeat);
    // Informamos por SSE y luego cerramos
    res.write(`event: error\ndata: ${JSON.stringify({
      message: "Espera un momento, estoy procesando información",
    })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
    return;
  }
 

  try {
    // inyectar ToolMessages faltantes
  
   
    
    const agentResp = await graph.invoke(
      { messages: last_message },
      { configurable: { thread_id , run_id: "123456" , systemPromptTemplate:SYSTEM_PROMPT_TEMPLATE, model: "gpt-4o"} , runId: "1234565689999789", streamMode: "updates" as const, }
    );
    console.log("agentResp: ");
    
    

   
  
    // const reply =
    //   agentResp.messages.at(-1)?.content || "No hay respuesta del agente";
    let reply = "";

    
    if(Array.isArray(agentResp)) {
        console.log("agentResp: ", agentResp.at(-1).callModel.messages[0].content);
      
      
       reply = agentResp.at(-1).callModel.messages[0].content || "No hay respuesta del agente";

    }

      

    

    // construir chunk
    const id = Date.now().toString();
    const created = Math.floor(Date.now() / 1000);
    const chunk = {
      id,
      object: "chat.completion.chunk",
      created,
      model: "gpt-4-o",
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content: reply === "" ? "Muy bien, voy a realizar la búsqueda espera un momento por favor" : reply },
          finish_reason: "stop",
        },
      ],
    };
    
    console.log("send a elevenlabs");
    // console.dir(chunk, { depth: null, colors: true });
    
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    res.write("data: [DONE]\n\n");
    // res.end()
    
  } catch (err:any) {
    res.write(
      `event: error\ndata: ${JSON.stringify({ message: err.message })}\n\n`
    );
    res.write("data: [DONE]\n\n");
    console.log("Error en /v1/chat/completions:", err);
  } finally {
    clearInterval(heartbeat);
   
    res.end();
  }
});


// Endpoint para enviar props (ejecutado desde LangGraph o alguna tool)
app.post("/api/enviar-cars", (req, res) => {
  const cars = req.body.cars;
  if (!Array.isArray(cars)) {
     res.status(400).json({ error: "Faltan los cars (deben ser un array)" });
     return
  }

  const message = JSON.stringify({ type: "cars", data: cars });
  connectedClients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });

  res.json({ ok: true });
});


// Manejar conexiones WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente conectado via WebSocket");
  connectedClients.add(ws);

  const heartbeat = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "ping" }));
    }
  }, 2000);

  ws.on("close", () => {
    console.log("Cliente desconectado");
    clearInterval(heartbeat);
    connectedClients.delete(ws);
  });
});



server.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
