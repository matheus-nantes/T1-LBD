import { Hotel } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateHotelDTO } from "../../dtos/CreateHotelDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateHotelUseCase{
    async execute({cnpj, nome, endereco, numeroEstrelas} : CreateHotelDTO): Promise<Hotel>{

        const hotelAlreadyExists = await prisma.hotel.findFirst({
            where: {
                cnpj,
            }
        });

        if(hotelAlreadyExists){
            throw new AppError("Este hotel já existe!");
        }

        const hotel = await prisma.hotel.create({
            data:{
                cnpj,
                nome,
                endereco,
                numeroEstrelas
            }
        });

        return hotel;
    }

}