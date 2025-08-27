package com.github.jesimielsilva.service.impl;

import com.github.jesimielsilva.model.Board;
import com.github.jesimielsilva.repository.BoardRepository;
import com.github.jesimielsilva.service.BoardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Board salvar(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public List<Board> listarTodos() {
        return boardRepository.findAll();
    }

    @Override
    public Board buscarPorId(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board não encontrado"));
    }
}
