/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cor` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "cor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tag_descricao_key" ON "tag"("descricao");
