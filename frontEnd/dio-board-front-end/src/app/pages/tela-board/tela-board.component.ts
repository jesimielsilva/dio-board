import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  connectedLists: string[] = [];

  constructor(private boardService: BoardService) {}

  ngOnChanges() {
    if (this.board?.colunas) {
      this.connectedLists = this.board.colunas.map(c => 'coluna-' + c.id);
    }
  }

  abrirModal() {
    console.log("Abrindo modal...");
    this.isModalOpen = true;
  }

  fecharModal() { this.isModalOpen = false; this.cardTitle = ''; this.cardDescription = ''; }

  criarCard() {
    if (!this.cardTitle.trim() || !this.board.colunas?.length) return;

    const primeiraColuna = this.board.colunas[0];
    if (!primeiraColuna.cards) primeiraColuna.cards = [];

    const novoCard: Partial<Card> = {
      titulo: this.cardTitle,
      descricao: this.cardDescription,
      dataCriacao: new Date(),
      bloqueado: false
    };

    this.boardService.createCard(primeiraColuna.id!, novoCard).subscribe({
      next: (cardCriado) => {
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

  // 🚀 Drag & Drop
  drop(event: CdkDragDrop<Card[]>, colunaDestino: Coluna) {
    if (event.previousContainer === event.container) {
      moveItemInArray(colunaDestino.cards!, event.previousIndex, event.currentIndex);
    } else {
      const cardMovido = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Persistir no backend
      this.boardService.moverCard(cardMovido.id!, colunaDestino.id!).subscribe({
        next: (cardAtualizado) => {
          console.log("Card movido com sucesso:", cardAtualizado);
        },
        error: (err) => {
          console.error("Erro ao mover card:", err);
          // rollback visual caso falhe
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }
}
