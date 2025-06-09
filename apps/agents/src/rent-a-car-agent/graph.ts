import { AIMessage,BaseMessage } from "@langchain/core/messages";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";

import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  typedUi,
  uiMessageReducer,
} from "@langchain/langgraph-sdk/react-ui/server";
import type { Auto } from "./types.js";
import {obtenerAutosDisponiblesParaAlquilar} from "./tools.js";
import {
  Annotation,
  END,
  LangGraphRunnableConfig,
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
  
  interrupt,
} from "@langchain/langgraph";



import { ConfigurationSchema, ensureConfiguration } from "./configuration.js";

import { loadChatModel } from "./utils.js";


// Definamos un state para el workflow
const stateGraph = Annotation.Root({
  ...MessagesAnnotation.spec,
  cars: Annotation<Auto[]>,
    ui: Annotation({ reducer: uiMessageReducer, default: () => [] }),
 
})

const tools = [obtenerAutosDisponiblesParaAlquilar]

const configuration = ensureConfiguration({configurable: { model: "gpt-4o" } });
const model = (await loadChatModel(configuration.model)).bindTools(tools);





// Define la función que llama al modelo
async function callModel(
  state: typeof stateGraph.State,
  // config: RunnableConfig
): Promise<typeof stateGraph.Update> {
  /** Llama al LLM de nuestro agente. **/


  const response = await model.invoke([
    {
      role: "system",
      content: configuration.systemPromptTemplate.replace(
        "{system_time}",
        new Date().toISOString()
      ),
    },
    ...state.messages,
  ]);

  // Retonarmos una lista, porque esto se agregara a la lista existente
  return { messages: [response] };
}

// Define la función que determina si continuar o no
function routeModelOutput(state: typeof stateGraph.State): string {
  const {messages, cars} = state;
 
  
  if( cars && cars.length > 0) {
    // Si hay autos disponibles, vamos a la UI
    return "items";
  }

  const lastMessage = messages[messages.length - 1];
  // Si hay llamada a herramientas ingresa por ahi
  if ((lastMessage as AIMessage)?.tool_calls?.length || 0 > 0) {
    return "tools";
  }
  // De otra manera termina el graph
  else {
    return "__end__";
  }
}

const itemsNode = (state: typeof stateGraph.State, config:LangGraphRunnableConfig) => {
    const { messages, cars } = state;
  // Aca se puede customizar prompt, modelo y logica

  const ui = typedUi(config);

  console.log("id lastMessage: ", messages[messages.length - 1].id);
  console.log("last message: ", messages[messages.length - 1].getType());
  
  // TODO: Pasar bien el id del mensaje, estoy manejando mal el id del mensaje de tool
  if(cars && cars.length > 0) {
    ui.push(
        {
        name: "carCarousel",
        props: { cars, user: { nombre: "Mariano"}},
        metadata: {
          message_id: messages[messages.length - 1].id,
        }
      },
      
      { message: messages[messages.length - 1] },
    )
  }

  return {ui:ui.items , messages:[...messages]}

}

// https://langchain-ai.github.io/langgraphjs/concepts/low_level/#messagesannotation
const workflow = new StateGraph(stateGraph, ConfigurationSchema)

  .addNode("callModel", callModel)
  .addNode("tools", new ToolNode(tools))
  .addNode("items", itemsNode)
  .addEdge("__start__", "callModel")
  .addConditionalEdges("callModel", routeModelOutput , ["tools" , "__end__" , "items"])
  .addEdge("tools", "callModel")
  .addEdge("items","__end__")

export const graph = workflow.compile({
  interruptBefore: [], // if you want to update the state before calling the tools
  interruptAfter: [],
});
