-- CreateTable
CREATE TABLE "hotel" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numeroEstrelas" INTEGER NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "nivel" TEXT NOT NULL DEFAULT 'bronze',

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "id" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataAdmissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hotelId" TEXT NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quarto" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "capacidadeAdultos" INTEGER NOT NULL,
    "capacidadeCriancas" INTEGER NOT NULL,
    "disponibilidade" TEXT NOT NULL,
    "precoDiaria" DECIMAL(65,30) NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "quarto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" TEXT NOT NULL,
    "checkin" TIMESTAMP(3) NOT NULL,
    "checkout" TIMESTAMP(3) NOT NULL,
    "nAdultos" INTEGER NOT NULL,
    "nCriancas" INTEGER NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,
    "metodo" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "reservaId" TEXT NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva_de_quartos" (
    "reservaId" TEXT NOT NULL,
    "quartoId" TEXT NOT NULL,

    CONSTRAINT "reserva_de_quartos_pkey" PRIMARY KEY ("reservaId","quartoId")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_dos_quartos" (
    "idQuarto" TEXT NOT NULL,
    "idTag" TEXT NOT NULL,

    CONSTRAINT "tag_dos_quartos_pkey" PRIMARY KEY ("idQuarto","idTag")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_cpf_key" ON "funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_reservaId_key" ON "pagamento"("reservaId");

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_de_quartos" ADD CONSTRAINT "reserva_de_quartos_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_de_quartos" ADD CONSTRAINT "reserva_de_quartos_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quarto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_dos_quartos" ADD CONSTRAINT "tag_dos_quartos_idQuarto_fkey" FOREIGN KEY ("idQuarto") REFERENCES "quarto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_dos_quartos" ADD CONSTRAINT "tag_dos_quartos_idTag_fkey" FOREIGN KEY ("idTag") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
