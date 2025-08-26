package com.github.jesimielsilva.controller;

import com.github.jesimielsilva.model.Coluna;
import com.github.jesimielsilva.service.ColunaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colunas")
@CrossOrigin(origins = "*")
public class ColunaController {

    private final ColunaService colunaService;

    public ColunaController(ColunaService colunaService) {
        this.colunaService = colunaService;
    }

    @PostMapping
    public Coluna criarColuna(@RequestBody Coluna coluna) {
        return colunaService.criarColuna(coluna);
    }

    @GetMapping("/board/{boardId}")
    public List<Coluna> listarPorBoard(@PathVariable Long boardId) {
        return colunaService.listarColunasPorBoard(boardId);
    }
}
