package com.github.jesimielsilva.service;

import com.github.jesimielsilva.model.Coluna;

import java.util.List;

public interface ColunaService {
    Coluna criarColuna(Coluna coluna);
    List<Coluna> listarColunasPorBoard(Long boardId);
}
