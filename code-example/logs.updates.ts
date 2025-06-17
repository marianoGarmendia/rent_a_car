// const responseUpdateFromInvoke = [
//   {
//     callModel: {
//       messages: [
//         AIMessage {
//           lc_serializable: true,
//           lc_kwargs: {
//             content: '¡Gracias, Mariano! 🎉 Con toda esta información, ya puedo mostrarte los autos disponibles para tus fechas. Dame un segundo mientras verifico las opciones. 😊\n' +
//               '\n' +
//               'Voy a buscar los autos disponibles para las fechas del 21 de junio al 29 de junio, para 2 personas, tipo "auto".',
//             name: undefined,
//             additional_kwargs: {
//               function_call: undefined,
//               tool_calls: [
//                 {
//                   id: 'call_sVl15wlF7WbDrWQxat8YWRLz',
//                   type: 'function',
//                   function: {
//                     name: 'obtenerAutosDisponiblesParaAlquilar',
//                     arguments: '{"fechaInicio":"2025-06-21","fechaFin":"2025-06-29","tipoAuto":"auto","cantidadPasajeros":2}'
//                   }
//                 }
//               ]
//             },
//             response_metadata: {
//               model_name: 'gpt-4o-2024-08-06',
//               usage: {
//                 prompt_tokens: 3196,
//                 completion_tokens: 112,
//                 total_tokens: 3308,
//                 prompt_tokens_details: { cached_tokens: 1920, audio_tokens: 0 },
//                 completion_tokens_details: {
//                   reasoning_tokens: 0,
//                   audio_tokens: 0,
//                   accepted_prediction_tokens: 0,
//                   rejected_prediction_tokens: 0
//                 }
//               },
//               system_fingerprint: 'fp_07871e2ad8'
//             },
//             id: 'chatcmpl-BirTpvBbFhCWaeE7pke4oQ30Pylbf',
//             tool_calls: [
//               {
//                 name: 'obtenerAutosDisponiblesParaAlquilar',
//                 args: {
//                   fechaInicio: '2025-06-21',
//                   fechaFin: '2025-06-29',
//                   tipoAuto: 'auto',
//                   cantidadPasajeros: 2
//                 },
//                 type: 'tool_call',
//                 id: 'call_sVl15wlF7WbDrWQxat8YWRLz'
//               }
//             ],
//             invalid_tool_calls: [],
//             usage_metadata: {
//               output_tokens: 112,
//               input_tokens: 3196,
//               total_tokens: 3308,
//               input_token_details: { audio: 0, cache_read: 1920 },
//               output_token_details: { audio: 0, reasoning: 0 }
//             }
//           },
//           lc_namespace: [ 'langchain_core', 'messages' ],
//           content: '¡Gracias, Mariano! 🎉 Con toda esta información, ya puedo mostrarte los autos disponibles para tus fechas. Dame un segundo mientras verifico las opciones. 😊\n' +
//             '\n' +
//             'Voy a buscar los autos disponibles para las fechas del 21 de junio al 29 de junio, para 2 personas, tipo "auto".',
//           name: undefined,
//           additional_kwargs: {
//             function_call: undefined,
//             tool_calls: [
//               {
//                 id: 'call_sVl15wlF7WbDrWQxat8YWRLz',
//                 type: 'function',
//                 function: {
//                   name: 'obtenerAutosDisponiblesParaAlquilar',
//                   arguments: '{"fechaInicio":"2025-06-21","fechaFin":"2025-06-29","tipoAuto":"auto","cantidadPasajeros":2}'
//                 }
//               }
//             ]
//           },
//           response_metadata: {
//             tokenUsage: {
//               promptTokens: 3196,
//               completionTokens: 112,
//               totalTokens: 3308
//             },
//             finish_reason: 'tool_calls',
//             model_name: 'gpt-4o-2024-08-06',
//             usage: {
//               prompt_tokens: 3196,
//               completion_tokens: 112,
//               total_tokens: 3308,
//               prompt_tokens_details: { cached_tokens: 1920, audio_tokens: 0 },
//               completion_tokens_details: {
//                 reasoning_tokens: 0,
//                 audio_tokens: 0,
//                 accepted_prediction_tokens: 0,
//                 rejected_prediction_tokens: 0
//               }
//             },
//             system_fingerprint: 'fp_07871e2ad8'
//           },
//           id: 'chatcmpl-BirTpvBbFhCWaeE7pke4oQ30Pylbf',
//           tool_calls: [
//             {
//               name: 'obtenerAutosDisponiblesParaAlquilar',
//               args: {
//                 fechaInicio: '2025-06-21',
//                 fechaFin: '2025-06-29',
//                 tipoAuto: 'auto',
//                 cantidadPasajeros: 2
//               },
//               type: 'tool_call',
//               id: 'call_sVl15wlF7WbDrWQxat8YWRLz'
//             }
//           ],
//           invalid_tool_calls: [],
//           usage_metadata: {
//             output_tokens: 112,
//             input_tokens: 3196,
//             total_tokens: 3308,
//             input_token_details: { audio: 0, cache_read: 1920 },
//             output_token_details: { audio: 0, reasoning: 0 }
//           }
//         }
//       ]
//     }
//   },
//   {
//     tools: [
//       {
//         ui: {
//           type: 'ui',
//           id: '3df95ba5-db53-4645-99db-2870cc18139d',
//           name: 'carCarousel',
//           props: {
//             cars: [
//               {
//                 id: 21,
//                 marca: 'Toyota',
//                 modelo: 'Etios',
//                 tipo: 'auto',
//                 combustible: 'nafta',
//                 cantidad_pasajeros: 5,
//                 precio_diario: 21000,
//                 automatico: true,
//                 tiene_aire: true,
//                 tiene_gps: true,
//                 tiene_bebesilla: false,
//                 fechas_ocupado: [],
//                 activo: true,
//                 img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg'
//               },
//               {
//                 id: 22,
//                 marca: 'Renault',
//                 modelo: 'Clio',
//                 tipo: 'auto',
//                 combustible: 'nafta',
//                 cantidad_pasajeros: 5,
//                 precio_diario: 20000,
//                 automatico: false,
//                 tiene_aire: true,
//                 tiene_gps: false,
//                 tiene_bebesilla: false,
//                 fechas_ocupado: [ { inicio: '2025-06-15', fin: '2025-06-18' } ],
//                 activo: true,
//                 img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg'
//               },
//               {
//                 id: 23,
//                 marca: 'Ford',
//                 modelo: 'Ka',
//                 tipo: 'auto',
//                 combustible: 'nafta',
//                 cantidad_pasajeros: 5,
//                 precio_diario: 19000,
//                 automatico: false,
//                 tiene_aire: true,
//                 tiene_gps: false,
//                 tiene_bebesilla: false,
//                 fechas_ocupado: [],
//                 activo: true,
//                 img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg'
//               }
//             ],
//             user: { nombre: 'Mariano' }
//           },
//           metadata: {
//             merge: true,
//             run_id: '123456',
//             tags: [],
//             name: 'tools',
//             message_id: 'chatcmpl-BirTpvBbFhCWaeE7pke4oQ30Pylbf'
//           }
//         }
//       },
//       {
//         ui: [
//           {
//             type: 'ui',
//             id: '3df95ba5-db53-4645-99db-2870cc18139d',
//             name: 'carCarousel',
//             props: {
//               cars: [
//                 {
//                   id: 21,
//                   marca: 'Toyota',
//                   modelo: 'Etios',
//                   tipo: 'auto',
//                   combustible: 'nafta',
//                   cantidad_pasajeros: 5,
//                   precio_diario: 21000,
//                   automatico: true,
//                   tiene_aire: true,
//                   tiene_gps: true,
//                   tiene_bebesilla: false,
//                   fechas_ocupado: [],
//                   activo: true,
//                   img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg'
//                 },
//                 {
//                   id: 22,
//                   marca: 'Renault',
//                   modelo: 'Clio',
//                   tipo: 'auto',
//                   combustible: 'nafta',
//                   cantidad_pasajeros: 5,
//                   precio_diario: 20000,
//                   automatico: false,
//                   tiene_aire: true,
//                   tiene_gps: false,
//                   tiene_bebesilla: false,
//                   fechas_ocupado: [ { inicio: '2025-06-15', fin: '2025-06-18' } ],
//                   activo: true,
//                   img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg'
//                 },
//                 {
//                   id: 23,
//                   marca: 'Ford',
//                   modelo: 'Ka',
//                   tipo: 'auto',
//                   combustible: 'nafta',
//                   cantidad_pasajeros: 5,
//                   precio_diario: 19000,
//                   automatico: false,
//                   tiene_aire: true,
//                   tiene_gps: false,
//                   tiene_bebesilla: false,
//                   fechas_ocupado: [],
//                   activo: true,
//                   img_url: 'https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg'
//                 }
//               ],
//               user: { nombre: 'Mariano' }
//             },
//             metadata: {
//               merge: true,
//               run_id: '123456',
//               tags: [],
//               name: 'tools',
//               message_id: 'chatcmpl-BirTpvBbFhCWaeE7pke4oQ30Pylbf'
//             }
//           }
//         ]
//       },
//       {
//         messages: [
//           ToolMessage {
//             lc_serializable: true,
//             lc_kwargs: {
//               content: '\n' +
//                 '    Hemos encontrado 3 autos disponibles para alquilar:\n' +
//                 '    [\n' +
//                 '  {\n' +
//                 '    "id": 21,\n' +
//                 '    "marca": "Toyota",\n' +
//                 '    "modelo": "Etios",\n' +
//                 '    "tipo": "auto",\n' +
//                 '    "combustible": "nafta",\n' +
//                 '    "cantidad_pasajeros": 5,\n' +
//                 '    "precio_diario": 21000,\n' +
//                 '    "automatico": true,\n' +
//                 '    "tiene_aire": true,\n' +
//                 '    "tiene_gps": true,\n' +
//                 '    "tiene_bebesilla": false,\n' +
//                 '    "fechas_ocupado": [],\n' +
//                 '    "activo": true,\n' +
//                 '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg"\n' +
//                 '  },\n' +
//                 '  {\n' +
//                 '    "id": 22,\n' +
//                 '    "marca": "Renault",\n' +
//                 '    "modelo": "Clio",\n' +
//                 '    "tipo": "auto",\n' +
//                 '    "combustible": "nafta",\n' +
//                 '    "cantidad_pasajeros": 5,\n' +
//                 '    "precio_diario": 20000,\n' +
//                 '    "automatico": false,\n' +
//                 '    "tiene_aire": true,\n' +
//                 '    "tiene_gps": false,\n' +
//                 '    "tiene_bebesilla": false,\n' +
//                 '    "fechas_ocupado": [\n' +
//                 '      {\n' +
//                 '        "inicio": "2025-06-15",\n' +
//                 '        "fin": "2025-06-18"\n' +
//                 '      }\n' +
//                 '    ],\n' +
//                 '    "activo": true,\n' +
//                 '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg"\n' +
//                 '  },\n' +
//                 '  {\n' +
//                 '    "id": 23,\n' +
//                 '    "marca": "Ford",\n' +
//                 '    "modelo": "Ka",\n' +
//                 '    "tipo": "auto",\n' +
//                 '    "combustible": "nafta",\n' +
//                 '    "cantidad_pasajeros": 5,\n' +
//                 '    "precio_diario": 19000,\n' +
//                 '    "automatico": false,\n' +
//                 '    "tiene_aire": true,\n' +
//                 '    "tiene_gps": false,\n' +
//                 '    "tiene_bebesilla": false,\n' +
//                 '    "fechas_ocupado": [],\n' +
//                 '    "activo": true,\n' +
//                 '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg"\n' +
//                 '  }\n' +
//                 ']\n' +
//                 '    Por favor verificar si estos autos cumplen con tus requerimientos.',
//               name: 'obtenerAutosDisponiblesParaAlquilar',
//               tool_call_id: 'call_sVl15wlF7WbDrWQxat8YWRLz',
//               additional_kwargs: {},
//               response_metadata: {},
//               id: '900c2ee0-63a9-45a4-9dfb-d437ca36184c'
//             },
//             lc_namespace: [ 'langchain_core', 'messages' ],
//             content: '\n' +
//               '    Hemos encontrado 3 autos disponibles para alquilar:\n' +
//               '    [\n' +
//               '  {\n' +
//               '    "id": 21,\n' +
//               '    "marca": "Toyota",\n' +
//               '    "modelo": "Etios",\n' +
//               '    "tipo": "auto",\n' +
//               '    "combustible": "nafta",\n' +
//               '    "cantidad_pasajeros": 5,\n' +
//               '    "precio_diario": 21000,\n' +
//               '    "automatico": true,\n' +
//               '    "tiene_aire": true,\n' +
//               '    "tiene_gps": true,\n' +
//               '    "tiene_bebesilla": false,\n' +
//               '    "fechas_ocupado": [],\n' +
//               '    "activo": true,\n' +
//               '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg"\n' +
//               '  },\n' +
//               '  {\n' +
//               '    "id": 22,\n' +
//               '    "marca": "Renault",\n' +
//               '    "modelo": "Clio",\n' +
//               '    "tipo": "auto",\n' +
//               '    "combustible": "nafta",\n' +
//               '    "cantidad_pasajeros": 5,\n' +
//               '    "precio_diario": 20000,\n' +
//               '    "automatico": false,\n' +
//               '    "tiene_aire": true,\n' +
//               '    "tiene_gps": false,\n' +
//               '    "tiene_bebesilla": false,\n' +
//               '    "fechas_ocupado": [\n' +
//               '      {\n' +
//               '        "inicio": "2025-06-15",\n' +
//               '        "fin": "2025-06-18"\n' +
//               '      }\n' +
//               '    ],\n' +
//               '    "activo": true,\n' +
//               '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg"\n' +
//               '  },\n' +
//               '  {\n' +
//               '    "id": 23,\n' +
//               '    "marca": "Ford",\n' +
//               '    "modelo": "Ka",\n' +
//               '    "tipo": "auto",\n' +
//               '    "combustible": "nafta",\n' +
//               '    "cantidad_pasajeros": 5,\n' +
//               '    "precio_diario": 19000,\n' +
//               '    "automatico": false,\n' +
//               '    "tiene_aire": true,\n' +
//               '    "tiene_gps": false,\n' +
//               '    "tiene_bebesilla": false,\n' +
//               '    "fechas_ocupado": [],\n' +
//               '    "activo": true,\n' +
//               '    "img_url": "https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg"\n' +
//               '  }\n' +
//               ']\n' +
//               '    Por favor verificar si estos autos cumplen con tus requerimientos.',
//             name: 'obtenerAutosDisponiblesParaAlquilar',
//             additional_kwargs: {},
//             response_metadata: {},
//             id: '900c2ee0-63a9-45a4-9dfb-d437ca36184c',
//             lc_direct_tool_output: true,
//             status: undefined,
//             tool_call_id: 'call_sVl15wlF7WbDrWQxat8YWRLz',
//             artifact: undefined
//           }
//         ]
//       }
//     ]
//   },
//   {
//     callModel: {
//       messages: [
//         AIMessage {
//           lc_serializable: true,
//           lc_kwargs: {
//             content: '¡Gracias, Mariano! Aquí te comparto algunas opciones de autos disponibles para las fechas que necesitas:\n' +
//               '\n' +
//               '1. **Toyota Etios**  \n' +
//               '   - **Precio diario:** $21,000\n' +
//               '   - Automático, aire acondicionado, con GPS  \n' +
//               '   ![Toyota Etios](https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg)\n' +
//               '\n' +
//               '2. **Renault Clio**  \n' +
//               '   - **Precio diario:** $20,000  \n' +
//               '   - Manual, aire acondicionado  \n' +
//               '   ![Renault Clio](https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg)\n' +
//               '\n' +
//               '3. **Ford Ka**  \n' +
//               '   - **Precio diario:** $19,000  \n' +
//               '   - Manual, aire acondicionado  \n' +
//               '   ![Ford Ka](https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg)\n' +
//               '\n' +
//               '¡Elegí el que más te guste y se lo paso a un asesor para que te ayude a concretar la reserva! 🚗✨',
//             name: undefined,
//             additional_kwargs: { function_call: undefined, tool_calls: undefined },
//             response_metadata: {
//               model_name: 'gpt-4o-2024-08-06',
//               usage: {
//                 prompt_tokens: 3782,
//                 completion_tokens: 258,
//                 total_tokens: 4040,
//                 prompt_tokens_details: { cached_tokens: 1920, audio_tokens: 0 },
//                 completion_tokens_details: {
//                   reasoning_tokens: 0,
//                   audio_tokens: 0,
//                   accepted_prediction_tokens: 0,
//                   rejected_prediction_tokens: 0
//                 }
//               },
//               system_fingerprint: 'fp_07871e2ad8'
//             },
//             id: 'chatcmpl-BirTrP5NSQnjyCcgzZ7TiNCUmGB3Y',
//             tool_calls: [],
//             invalid_tool_calls: [],
//             usage_metadata: {
//               output_tokens: 258,
//               input_tokens: 3782,
//               total_tokens: 4040,
//               input_token_details: { audio: 0, cache_read: 1920 },
//               output_token_details: { audio: 0, reasoning: 0 }
//             }
//           },
//           lc_namespace: [ 'langchain_core', 'messages' ],
//           content: '¡Gracias, Mariano! Aquí te comparto algunas opciones de autos disponibles para las fechas que necesitas:\n' +
//             '\n' +
//             '1. **Toyota Etios**  \n' +
//             '   - **Precio diario:** $21,000\n' +
//             '   - Automático, aire acondicionado, con GPS  \n' +
//             '   ![Toyota Etios](https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/01/2024-Mazda-3-G25-GT.jpg)\n' +
//             '\n' +
//             '2. **Renault Clio**  \n' +
//             '   - **Precio diario:** $20,000  \n' +
//             '   - Manual, aire acondicionado  \n' +
//             '   ![Renault Clio](https://images.carexpert.com.au/resize/3000/-/app/uploads/2025/02/2025-Subaru-Impreza.jpg)\n' +
//             '\n' +
//             '3. **Ford Ka**  \n' +
//             '   - **Precio diario:** $19,000  \n' +
//             '   - Manual, aire acondicionado  \n' +
//             '   ![Ford Ka](https://images.carexpert.com.au/resize/3000/-/app/uploads/2024/03/2024-Honda-Civic-Hybrid.jpg)\n' +
//             '\n' +
//             '¡Elegí el que más te guste y se lo paso a un asesor para que te ayude a concretar la reserva! 🚗✨',
//           name: undefined,
//           additional_kwargs: { function_call: undefined, tool_calls: undefined },
//           response_metadata: {
//             tokenUsage: {
//               promptTokens: 3782,
//               completionTokens: 258,
//               totalTokens: 4040
//             },
//             finish_reason: 'stop',
//             model_name: 'gpt-4o-2024-08-06',
//             usage: {
//               prompt_tokens: 3782,
//               completion_tokens: 258,
//               total_tokens: 4040,
//               prompt_tokens_details: { cached_tokens: 1920, audio_tokens: 0 },
//               completion_tokens_details: {
//                 reasoning_tokens: 0,
//                 audio_tokens: 0,
//                 accepted_prediction_tokens: 0,
//                 rejected_prediction_tokens: 0
//               }
//             },
//             system_fingerprint: 'fp_07871e2ad8'
//           },
//           id: 'chatcmpl-BirTrP5NSQnjyCcgzZ7TiNCUmGB3Y',
//           tool_calls: [],
//           invalid_tool_calls: [],
//           usage_metadata: {
//             output_tokens: 258,
//             input_tokens: 3782,
//             total_tokens: 4040,
//             input_token_details: { audio: 0, cache_read: 1920 },
//             output_token_details: { audio: 0, reasoning: 0 }
//           }
//         }
//       ]
//     }
//   }
// ]