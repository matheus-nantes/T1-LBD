/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `hotel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero]` on the table `quarto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotel" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hotel_cnpj_key" ON "hotel"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "quarto_numero_key" ON "quarto"("numero");
