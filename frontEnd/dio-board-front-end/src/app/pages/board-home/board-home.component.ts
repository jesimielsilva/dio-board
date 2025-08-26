import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Board } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-board-home',
  templateUrl: './board-home.component.html',
  styleUrls: ['./board-home.component.css']
})
export class BoardHomeComponent {
abrirCriarCard($event: Board) {
throw new Error('Method not implemented.');
}
boardSelecionado: any;
boards: any;
boardAtual!: Board;
selecionarBoard() {
throw new Error('Method not implemented.');
}
abrirGerenciarColunas() {
throw new Error('Method not implemented.');
}
abrirCriarBoard() {
throw new Error('Method not implemented.');
}


  colunas: any[] = [];

  novoCardTitulo = '';
  novoCardDescricao = '';
  novoNome: any;
  novoTipo!: string;
  showBoardModal = false;
  showCardModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarColunas();
  }

  carregarColunas() {
    const boardId = 1; // estamos usando o board 1 como exemplo
    this.http.get<any[]>(`http://localhost:8080/api/colunas/board/${boardId}`)
      .subscribe(data => this.colunas = data);
  }

   abrirModalBoard() {
    this.showBoardModal = true;
  }

  fecharModalBoard() {
    this.showBoardModal = false;
  }

  abrirModalCard() {
    this.showCardModal = true;
  }

  fecharModalCard() {
    this.showCardModal = false;
  }

  salvarBoard(boardName: string) {
    console.log('Novo Board:', boardName);
    this.fecharModalBoard();
    // aqui depois você integra com service/api
  }

  salvarCard(cardData: { titulo: string; descricao: string }) {
    console.log('Novo Card:', cardData);
    this.fecharModalCard();
    // aqui depois você integra com service/api
  }

  criarCard(colunaId: number) {
    if (!this.novoCardTitulo) return;

    const card = {
      titulo: this.novoCardTitulo,
      descricao: this.novoCardDescricao
    };

    this.http.post(`http://localhost:8080/api/cards/coluna/${colunaId}`, card)
      .subscribe(() => {
        this.novoCardTitulo = '';
        this.novoCardDescricao = '';
        this.carregarColunas(); // atualiza a coluna com o novo card
      });
  }

  criarColuna(nome: string, tipo: string) {
    const boardId = 1; // pode gerar dinamicamente depois
    const coluna = { nome, tipo, ordem: this.colunas.length + 1, boardId };

    this.http.post('http://localhost:8080/api/colunas', coluna)
      .subscribe(() => this.carregarColunas());
  }

}
