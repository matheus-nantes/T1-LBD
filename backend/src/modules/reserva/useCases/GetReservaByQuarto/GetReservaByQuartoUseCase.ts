import {  Reserva } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetReservaByQuartoUseCase {
    async execute(quartoId : string): Promise<Reserva[]>{


        const reservasDoQuarto = await prisma.reservaQuartos.findMany({
            where:{
                quartoId
            }
        })

        var reservas;

        for(const reservaid of reservasDoQuarto){
            const temp = await prisma.reserva.findUnique({
                where:{
                    id : reservaid.reservaId
                }
            })
            reservas.push(temp);
        }

        reservas.sort((a, b) => a.checkin.getTime() - b.checkin.getTime());

        return reservas;
    }
}