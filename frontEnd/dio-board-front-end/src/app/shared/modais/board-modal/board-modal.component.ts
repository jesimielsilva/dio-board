import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from 'src/app/core/models/board.model';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css']
})
export class BoardModalComponent {
   boardName = '';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Board>();

  constructor(private boardService: BoardService) {}

  createBoard() {
    if (!this.boardName.trim()) return;

    const novoBoard: Partial<Board> = {
      nome: this.boardName
    };

    this.boardService.createBoard(novoBoard).subscribe({
      next: (boardCriado) => {
        this.save.emit(boardCriado); // envia para o pai
        this.boardName = '';
      },
      error: (err) => {
        console.error('Erro ao criar board', err);
      }
    });
  }

  fechar() {
    this.close.emit();
    this.boardName = '';
  }
}
