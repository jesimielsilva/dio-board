import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent {

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<{ title: string, description: string }>();
  @Output() save = new EventEmitter<{ titulo: string; descricao: string }>();
  
  cardTitle: string = '';
  cardDescription: string = '';

  createCard() {
    if (this.cardTitle.trim()) {
      this.created.emit({ title: this.cardTitle, description: this.cardDescription });
      this.close();
    }
  }

  close() {
    this.closed.emit();
    this.cardTitle = '';
    this.cardDescription = '';
  }

  salvar() {
    if (this.cardTitle.trim()) {
      this.save.emit({ titulo: this.cardTitle, descricao: this.cardDescription });
    }
  }

}
