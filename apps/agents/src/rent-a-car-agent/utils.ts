import { initChatModel } from "langchain/chat_models/universal";

/**
 * Carga un modelo de chat con el nombre especifico
 * @param fullySpecifiedName - String en el formato 'provider/model' o 'provider/account/provider/model'.
 * @returns Una promesa que resuelve a una instancia de BaseChatModel.
 */
export async function loadChatModel(
  fullySpecifiedName: string
): Promise<ReturnType<typeof initChatModel>> {
  const index = fullySpecifiedName.indexOf("/");
  if (index === -1) {
    // Si no hay "/", asumimos que es solo el modelo
    return await initChatModel(fullySpecifiedName);
  } else {
    const provider = fullySpecifiedName.slice(0, index);
    const model = fullySpecifiedName.slice(index + 1);
    return await initChatModel(model, { modelProvider: provider });
  }
}
