package com.github.jesimielsilva.service;

import com.github.jesimielsilva.model.Card;

import java.util.List;

public interface CardService {
    Card criarCard(Long colunaId, Card card);
    List<Card> listarCardsPorColuna(Long colunaId);
}
