package com.github.jesimielsilva.controller;

import com.github.jesimielsilva.model.Board;
import com.github.jesimielsilva.service.BoardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public Board criarBoard(@RequestBody Board board) {
        return boardService.salvar(board);
    }

    @GetMapping
    public List<Board> listarBoards() {
        return boardService.listarTodos();
    }

    @GetMapping("/{id}")
    public Board buscarBoard(@PathVariable Long id) {
        return boardService.buscarPorId(id);
    }
}
