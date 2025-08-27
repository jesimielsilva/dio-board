import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiUrl = 'http://localhost:8080/api/boards';

  constructor(private http: HttpClient) {}

  // Buscar todos os boards
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }

  // Criar um novo board
  createBoard(board: Partial<Board>): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, board);
  }

  // Buscar um board específico
  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }

  // Atualizar um board
  updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/${board.id}`, board);
  }

  // Deletar um board
  deleteBoard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
