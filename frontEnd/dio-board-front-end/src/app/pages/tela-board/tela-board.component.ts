import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board, Card, Coluna } from 'src/app/core/models/board.model';
import { BoardService } from 'src/app/core/services/board.service';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-tela-board',
  templateUrl: './tela-board.component.html',
  styleUrls: ['./tela-board.component.css']
})
export class TelaBoardComponent {
  
 @Input() board!: Board;
  @Output() cardAdicionado = new EventEmitter<{ card: Card; coluna: Coluna }>();

  isModalOpen = false;
  cardTitle = '';
  cardDescription = '';

  constructor(private boardService: BoardService) {}

  abrirModal() {
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
    this.cardTitle = '';
    this.cardDescription = '';
  }

  criarCard() {
    if (!this.cardTitle.trim() || !this.board.colunas || this.board.colunas.length === 0) return;

    const primeiraColuna = this.board.colunas[0];

    if (!primeiraColuna.cards) {
      primeiraColuna.cards = []; // garante que seja array
    }

    const novoCard: Partial<Card> = {
      titulo: this.cardTitle,
      descricao: this.cardDescription,
      dataCriacao: new Date(),
      bloqueado: false
    };

    this.boardService.createCard(primeiraColuna.id!, novoCard).subscribe({
      next: (cardCriado) => {
        // 👇 garante que adicionamos no array e não substituímos por objeto
        primeiraColuna.cards = [...(primeiraColuna.cards || []), cardCriado];

        this.cardAdicionado.emit({ card: cardCriado, coluna: primeiraColuna });
        this.fecharModal();
      },
      error: (err) => console.error('Erro ao criar card:', err)
    });
  }


  abrirDetalhesCard(card: Card, col: Coluna) {
    console.log("Abrir detalhes do card:", card, "na coluna:", col.nome);
  }
}
