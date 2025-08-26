import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board, Card, Coluna } from 'src/app/core/models/board.model';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-tela-board',
  templateUrl: './tela-board.component.html',
  styleUrls: ['./tela-board.component.css']
})
export class TelaBoardComponent {
onDrop($event: Event,_t9: Coluna) {
throw new Error('Method not implemented.');
}

  @Input() board!: Board;
  @Output() novoCard = new EventEmitter<Board>();

  abrirDetalhesCard(card: Card, coluna: Coluna) {
    if (card.bloqueado) {
      alert(`Card bloqueado. Motivo: ${card.motivoBloqueio}`);
    } else {
      console.log("Detalhes do card:", card);
    }
  }

}
