import { Reserva } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetReservaByClienteUseCase {
  async execute(clienteId: string): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
      where: {
        clienteId
      },
      orderBy:{
        checkin:"desc"
      }
    });

    return reservas;
  }
}
