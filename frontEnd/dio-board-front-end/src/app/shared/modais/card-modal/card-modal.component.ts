import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent {
  
  @Input() isOpen = false; // controla se modal aparece
  @Input() columnId!: string; // para saber em qual coluna criar

  @Output() closeModal = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  cardTitle: string = '';
  cardDescription: string = '';

  close() {
    this.isOpen = false;
    this.closeModal.emit();
  }

  createCard() {
    if (!this.cardTitle.trim()) return;

    this.create.emit({
      title: this.cardTitle,
      description: this.cardDescription,
      columnId: this.columnId
    });

    this.cardTitle = '';
    this.cardDescription = '';
    this.close();
  }

}
