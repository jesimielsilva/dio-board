package com.github.jesimielsilva.service;

import com.github.jesimielsilva.model.Board;

import java.util.List;

public interface BoardService {

    Board salvar(Board board);
    List<Board> listarTodos();
    Board buscarPorId(Long id);
}
