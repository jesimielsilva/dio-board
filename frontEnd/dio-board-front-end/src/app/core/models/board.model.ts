export interface Card {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  bloqueado: boolean;
  motivoBloqueio?: string;
}

export interface Coluna {
  id: string;
  nome: string;
  ordem: number;
  tipo: 'Inicial' | 'Pendente' | 'Final' | 'Cancelamento';
  cards: Card[];
}

export interface Board {
  id: string;
  nome: string;
  colunas: Coluna[];
}
