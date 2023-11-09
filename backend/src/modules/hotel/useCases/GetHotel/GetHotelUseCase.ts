import { Hotel } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetHotelUseCase {
    async execute(): Promise<Hotel[]>{
        const hotels = await prisma.hotel.findMany({});

        return hotels;
    }
}