import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useStreamContext,
  type UIMessage,
  
} from "@langchain/langgraph-sdk/react-ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type Props = {
  cars: Car[];
  user: {
    nombre: string;
    email: string;
  };
};

export function CarCarousel({ cars, user }: Props) {
  const thread = useStreamContext<
    { messages: Message[]; ui: UIMessage[] },
    { MetaType: { ui: UIMessage | undefined } }
  >();

  const handleReserve = (car: Car) => {
    const toolCallId = uuidv4();

    thread.submit(
      {},
      {
        command: {
          update: {
            messages: [
              {
                id: uuidv4(),
                type: "ai",
                content: `Solicitando reserva del auto ${car.marca} ${car.modelo}`,
                tool_calls: [
                  {
                    id: toolCallId,
                    name: "reservar_auto",
                    args: {
                      car,
                      user,
                    },
                  },
                ],
              },
            ],
          },
          goto: "generalInput",
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full sm:max-w-sm md:max-w-3xl"
      >
        <CarouselContent>
          {cars.map((car) => (
            <CarouselItem
              key={car.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-4 bg-white rounded-lg shadow-md flex flex-col h-full">
                <img
                  src={car.img_url}
                  alt={`${car.marca} ${car.modelo}`}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      {car.marca} {car.modelo}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {car.tipo} · {car.combustible} ·{" "}
                      {car.automatico ? "Automático" : "Manual"}
                    </p>
                    <p className="text-sm text-gray-700">
                      Pasajeros: {car.cantidad_pasajeros}
                    </p>
                    <p className="text-md font-semibold text-black">
                      ${car.precio_diario.toLocaleString()} / día
                    </p>
                  </div>
                  <Button
                    className="mt-3 w-full"
                    onClick={() => handleReserve(car)}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
