export interface Card {
  id?: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  bloqueado: boolean;
  motivoBloqueio?: string;
}

export interface Coluna {
  id?: number;
  nome: string;
  ordem: number;
  tipo: 'Inicial' | 'Pendente' | 'Final' | 'Cancelamento';
  cards: Card[];
}

export interface Board {
  id?: number;
  nome: string;
  colunas: Coluna[];
}
