export interface CreateReservaDTO{
  checkin: Date;
  checkout: Date;
  nAdultos: number;
  nCriancas: number;
  status: string;
  clienteId: string;
  funcionarioId: string;
  quartosReservados: QuartoReservadoDTO[];
  metodoPagamento: string;
}

export interface QuartoReservadoDTO {
    quartoId: string;
}