import express from "express";

import cors from "cors";

import { SYSTEM_PROMPT_TEMPLATE } from "./src/rent-a-car-agent/prompts.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// import { processAudioElevenLabs } from "./procesing-voices/text-to-speech.js";
// import { ensureToolCallsHaveResponses } from "./ensure-tool-response.ts";

const __filename = fileURLToPath(import.meta.url);
console.log("filename: ", __filename);

const __dirname = dirname(__filename);
console.log("dirname: ", __dirname);



import { graph } from "./src/rent-a-car-agent/graph.js";
import { isArray } from "lodash-es";


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware para parsear JSON
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..")));
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));
console.log("path.join: ", path.join(__dirname, "public"));




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

    console.log("agentResp: ", (agentResp as any).at(-1).callModel.messages[0].content);
    
    if(isArray(agentResp)) {
      console.log(agentResp);
      
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

// Lista de clientes conectados vía SSE
const clients: any[] = [];

app.get("/events/props", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // O "*", si querés habilitar todos los orígenes
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
console.log("Conectando cliente SSE...");
console.dir("req: ", req);

  // Enviar evento de bienvenida
  res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);

  // Guardamos la conexión
  clients.push(res);

  // Cuando el cliente se desconecta, lo eliminamos
  req.on("close", () => {
    const i = clients.indexOf(res);
    if (i !== -1) clients.splice(i, 1);
  });
});

// Endpoint que usás desde LangGraph o tus tools para enviar autos
app.post("/api/enviar-props", (req, res) => {
  const props = req.body.props;
  console.log("enviando props: ", props);
  
  if (!Array.isArray(props)) {
    res.status(400).json({ error: "Faltan las props" });
    return
  }

  const payload = `event: props\ndata: ${JSON.stringify(props)}\n\n`;

  // Emitir a todos los clientes conectados
  clients.forEach(client => client.write(payload));

  res.status(200).json({ ok: true });
  return
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
