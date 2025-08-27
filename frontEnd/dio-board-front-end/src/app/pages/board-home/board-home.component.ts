import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Board, Card, Coluna } from 'src/app/core/models/board.model';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-board-home',
  templateUrl: './board-home.component.html',
  styleUrls: ['./board-home.component.css']
})
export class BoardHomeComponent {
  
  boards: Board[] = [];
  boardAtual: Board | null = null;
  boardSelecionado: number | null = null;

  colunas: Coluna[] = [];

  novoCardTitulo = '';
  novoCardDescricao = '';
  novoColunaNome = '';
  novoColunaTipo = '';

  showBoardModal = false;
  showCardModal = false;

  constructor(
    private http: HttpClient,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.carregarBoards();
  }

  // -------- Boards --------
  carregarBoards() {
    this.boardService.getBoards().subscribe(data => {
      this.boards = data;
      if (data.length > 0) {
        this.boardSelecionado = data[0].id!;
        this.selecionarBoard();
      }
    });
  }

  selecionarBoard() {
    if (this.boardSelecionado) {
      this.boardService.getBoardById(this.boardSelecionado).subscribe(board => {
        this.boardAtual = board;
        this.colunas = board.colunas || [];
      });
    }
  }

  salvarBoard(board: Board) {
    // já vem do backend com id correto
    // adiciona colunas padrão
    board.colunas = [
      { nome: 'A Fazer', ordem: 1, tipo: 'Inicial', cards: [] },
      { nome: 'Em Progresso', ordem: 2, tipo: 'Pendente', cards: [] },
      { nome: 'Concluído', ordem: 3, tipo: 'Final', cards: [] },
      { nome: 'Cancelado', ordem: 4, tipo: 'Cancelamento', cards: [] }
    ];

    this.boards.push(board);
    this.boardSelecionado = board.id!;
    this.boardAtual = board;
    this.colunas = board.colunas;
    this.fecharModalBoard();
  }


  // -------- Colunas --------
  criarColuna(nome: string, tipo: string) {
    if (!this.boardAtual) return;

    const coluna: Coluna = {
      nome,
      tipo: tipo as Coluna['tipo'],
      ordem: this.colunas.length + 1,
      cards: []
    };

    this.http.post<Coluna>(`http://localhost:8080/api/colunas`, { ...coluna, boardId: this.boardAtual.id })
      .subscribe(colunaCriada => {
        this.colunas.push(colunaCriada);
      });
  }

  // -------- Cards --------
  criarCard(colunaId: number) {
    if (!this.novoCardTitulo.trim()) return;

    const card: Partial<Card> = {
      titulo: this.novoCardTitulo,
      descricao: this.novoCardDescricao,
      dataCriacao: new Date(),
      bloqueado: false
    };

    this.http.post<Card>(`http://localhost:8080/api/cards/coluna/${colunaId}`, card)
      .subscribe(cardCriado => {
        const coluna = this.colunas.find(c => c.id === colunaId);
        if (coluna) {
          coluna.cards.push(cardCriado);
        }
        this.novoCardTitulo = '';
        this.novoCardDescricao = '';
        this.fecharModalCard();
      });
  }

  // -------- Modais --------
  abrirModalBoard() { this.showBoardModal = true; }
  fecharModalBoard() { this.showBoardModal = false; }

  abrirModalCard() { this.showCardModal = true; }
  fecharModalCard() { this.showCardModal = false; }

  abrirGerenciarColunas() {
    console.log("Gerenciar colunas clicado");
  }

}
