import {  Reserva } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";



export class GetReservaByQuartoUseCase {
    
    async execute(quartoId : string): Promise<Reserva[]>{

        var reservas: Reserva[] = [];
        const reservasDoQuarto = await prisma.reservaQuartos.findMany({
            where:{
                quartoId
            }
        })

        if(reservasDoQuarto){
            for(const reservaid of reservasDoQuarto){
                var temp = await prisma.reserva.findFirst({
                    where:{
                        id : reservaid.reservaId
                    }
                })
                if(temp)
                reservas.push(temp);
            }

        return reservas;
        }

        else{
            throw new AppError("Não há reservas para este quarto");
        }
    }
}