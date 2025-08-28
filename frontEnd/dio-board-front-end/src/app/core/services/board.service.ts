import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Card, Coluna } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

   private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Boards
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.api}/boards`);
  }

  createBoard(board: Partial<Board>): Observable<Board> {
    return this.http.post<Board>(`${this.api}/boards`, board);
  }

  // **Adicione este método**
  getBoardById(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.api}/boards/${boardId}`);
  }

  // Colunas
  getColunas(boardId: number): Observable<Coluna[]> {
    return this.http.get<Coluna[]>(`${this.api}/boards/${boardId}`);
  }

  createColuna(boardId: number, coluna: Partial<Coluna>): Observable<Coluna> {
    return this.http.post<Coluna>(`${this.api}/boards/${boardId}/colunas`, coluna);
  }

  // Cards
  createCard(colunaId: number, card: Partial<Card>): Observable<Card> {
    return this.http.post<Card>(`${this.api}/colunas/${colunaId}/cards`, card);
  }

  getCards(colunaId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.api}/colunas/${colunaId}/cards`);
  }
}
