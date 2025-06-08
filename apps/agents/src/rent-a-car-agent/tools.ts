import { LangGraphRunnableConfig } from "@langchain/langgraph";

import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const obtenerAutosDisponiblesParaAlquilar = tool(
  async (
    { fechaInicio, fechaFin, tipoAuto, cantidadPasajeros },
    config: LangGraphRunnableConfig
  ) => {},
  {
    name: "obtenerAutosDisponiblesParaAlquilar",
    description:
      "Herramienta para obtener los autos disponibles para alquilar, según los requerimientos del usuario.",
    schema: z.object({
      fechaInicio: z
        .string()
        .describe("Fecha de inicio del alquiler en formato YYYY-MM-DD."),
      fechaFin: z
        .string()
        .describe("Fecha de fin del alquiler en formato YYYY-MM-DD."),
      tipoAuto: z
        .enum(["auto", "camioneta", "SUV", "familiar", "económico"])
        .describe(
          "Tipo de auto preferido, esto puede ser opcional, el usuario puede pedir un tipo en particular o puede quedar abierto a cualquier tipo de auto disponible."
        ),
      cantidadPasajeros: z
        .number()
        .describe(
          "Cantidad de pasajeros que van a viajar en el auto, ésta información debe ser brindada por el usuario, entre 1 y 7 pasajeros son posibles, según la disponibilidad de autos."
        ),
    }),
  }
);
