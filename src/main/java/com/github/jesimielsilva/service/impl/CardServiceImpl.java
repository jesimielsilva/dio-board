package com.github.jesimielsilva.service.impl;

import com.github.jesimielsilva.model.Card;
import com.github.jesimielsilva.model.Coluna;
import com.github.jesimielsilva.repository.CardRepository;
import com.github.jesimielsilva.repository.ColunaRepository;
import com.github.jesimielsilva.service.CardService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final ColunaRepository colunaRepository;

    public CardServiceImpl(CardRepository cardRepository, ColunaRepository colunaRepository) {
        this.cardRepository = cardRepository;
        this.colunaRepository = colunaRepository;
    }

    @Override
    public Card criarCard(Long colunaId, Card card) {
        Coluna coluna = colunaRepository.findById(colunaId)
                .orElseThrow(() -> new RuntimeException("Coluna não encontrada"));

        card.setColuna(coluna);
        card.setDataCriacao(LocalDateTime.now());
        return cardRepository.save(card);
    }

    @Override
    public List<Card> listarCardsPorColuna(Long colunaId) {
        return cardRepository.findByColunaId(colunaId);
    }

    @Override
    public Card moverCard(Long cardId, Long novaColunaId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card não encontrado"));

        Coluna novaColuna = colunaRepository.findById(novaColunaId)
                .orElseThrow(() -> new RuntimeException("Coluna não encontrada"));

        card.setColuna(novaColuna);
        return cardRepository.save(card);
    }

}
