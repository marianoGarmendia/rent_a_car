import { AIMessage } from "@langchain/core/messages";
import { RunnableConfig } from "@langchain/core/runnables";

import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  typedUi,
  uiMessageReducer,
} from "@langchain/langgraph-sdk/react-ui/server";

import {
  Annotation,
  END,
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
  interrupt,
} from "@langchain/langgraph";

import { ConfigurationSchema, ensureConfiguration } from "./configuration.js";

import { loadChatModel } from "./utils.js";

// Define la función que llama al modelo
async function callModel(
  state: typeof MessagesAnnotation.State,
  config: RunnableConfig
): Promise<typeof MessagesAnnotation.Update> {
  /** Llama al LLM de nuestro agente. **/
  const configuration = ensureConfiguration(config);

  // Aca se puede customizar prompt, modelo y logica
  const model = (await loadChatModel(configuration.model)).bindTools([]);

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
function routeModelOutput(state: typeof MessagesAnnotation.State): string {
  const messages = state.messages;
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

// https://langchain-ai.github.io/langgraphjs/concepts/low_level/#messagesannotation
const workflow = new StateGraph(MessagesAnnotation, ConfigurationSchema)

  .addNode("callModel", callModel)
  .addNode("tools", new ToolNode([]))
  .addEdge("__start__", "callModel")
  .addConditionalEdges("callModel", routeModelOutput)
  .addEdge("tools", "callModel");

export const graph = workflow.compile({
  interruptBefore: [], // if you want to update the state before calling the tools
  interruptAfter: [],
});
