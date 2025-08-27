import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board, Card, Coluna } from 'src/app/core/models/board.model';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-tela-board',
  templateUrl: './tela-board.component.html',
  styleUrls: ['./tela-board.component.css']
})
export class TelaBoardComponent {
  
  @Input() board: any;
  @Output() cardAdicionado = new EventEmitter<any>();

  isModalOpen = false;
  cardTitle = '';
  cardDescription = '';

  abrirModal() {
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
    this.cardTitle = '';
    this.cardDescription = '';
  }

  criarCard() {
    if (!this.cardTitle.trim()) return;

    const novoCard = {
      id: Date.now(),
      titulo: this.cardTitle,
      descricao: this.cardDescription,
      dataCriacao: new Date(),
      bloqueado: false
    };

    if (this.board.colunas.length > 0) {
      this.board.colunas[0].cards.push(novoCard);
      this.cardAdicionado.emit({ card: novoCard, coluna: this.board.colunas[0] });
    }

    this.fecharModal();
  }

  abrirDetalhesCard(card: any, col: any) {
    console.log("Abrir detalhes do card:", card, "na coluna:", col.nome);
  }
}
