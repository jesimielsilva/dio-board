import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css']
})
export class BoardModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<string>();
  //@Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  boardName: string = '';

  createBoard() {
    if (this.boardName.trim()) {
      this.created.emit(this.boardName);
      this.close();
    }
  }

  salvar() {
    if (this.boardName.trim()) {
      this.save.emit(this.boardName);
    }
  }

  close() {
    this.closed.emit();
    this.boardName = '';
  }
}
