package com.github.jesimielsilva.controller;

import com.github.jesimielsilva.model.Card;
import com.github.jesimielsilva.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/coluna/{colunaId}")
    public Card criarCard(@PathVariable Long colunaId, @RequestBody Card card) {
        return cardService.criarCard(colunaId, card);
    }

    @GetMapping("/coluna/{colunaId}")
    public List<Card> listarCardsPorColuna(@PathVariable Long colunaId) {
        return cardService.listarCardsPorColuna(colunaId);
    }

    @PutMapping("/{cardId}/mover/{novaColunaId}")
    public ResponseEntity<Card> moverCard(
            @PathVariable Long cardId,
            @PathVariable Long novaColunaId) {
        return ResponseEntity.ok(cardService.moverCard(cardId, novaColunaId));
    }


}
