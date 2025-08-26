package com.github.jesimielsilva.service.impl;

import com.github.jesimielsilva.model.Board;
import com.github.jesimielsilva.model.Coluna;
import com.github.jesimielsilva.model.TipoColuna;
import com.github.jesimielsilva.repository.BoardRepository;
import com.github.jesimielsilva.repository.ColunaRepository;
import com.github.jesimielsilva.service.ColunaService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ColunaServiceImpl implements ColunaService {
    private final ColunaRepository colunaRepository;
    private final BoardRepository boardRepository;

    public ColunaServiceImpl(ColunaRepository colunaRepository, BoardRepository boardRepository) {
        this.colunaRepository = colunaRepository;
        this.boardRepository = boardRepository;
    }

    @Transactional
    @Override
    public Coluna criarColuna(Coluna coluna) {
        Board board;

        if (coluna.getBoard() == null || coluna.getBoard().getId() == null) {
            // cria board default
            board = new Board();
            board.setNome("Board Padrão");
            board = boardRepository.save(board);
        } else {
            board = boardRepository.findById(coluna.getBoard().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Board não encontrado"));
        }

        List<Coluna> colunas = board.getColunas();

        // Valida regras de tipo único
        if (coluna.getTipo() == TipoColuna.INICIAL &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.INICIAL)) {
            throw new IllegalArgumentException("O board já possui uma coluna INICIAL.");
        }
        if (coluna.getTipo() == TipoColuna.FINAL &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.FINAL)) {
            throw new IllegalArgumentException("O board já possui uma coluna FINAL.");
        }
        if (coluna.getTipo() == TipoColuna.CANCELAMENTO &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.CANCELAMENTO)) {
            throw new IllegalArgumentException("O board já possui uma coluna de CANCELAMENTO.");
        }

        // Define ordem
        if (coluna.getTipo() == TipoColuna.INICIAL) coluna.setOrdem(1);
        else if (coluna.getTipo() == TipoColuna.FINAL) coluna.setOrdem(colunas.size() + 1);
        else if (coluna.getTipo() == TipoColuna.CANCELAMENTO) coluna.setOrdem(colunas.size() + 2);
        else coluna.setOrdem(colunas.size() + 1); // PENDENTE

        coluna.setBoard(board);
        return colunaRepository.save(coluna);
    }

    @Override
    public List<Coluna> listarColunasPorBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .map(Board::getColunas)
                .orElse(new ArrayList<>());
    }

}
