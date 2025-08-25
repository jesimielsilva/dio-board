package com.github.jesimielsilva.service.impl;

import com.github.jesimielsilva.model.Board;
import com.github.jesimielsilva.model.Coluna;
import com.github.jesimielsilva.model.TipoColuna;
import com.github.jesimielsilva.repository.BoardRepository;
import com.github.jesimielsilva.repository.ColunaRepository;
import com.github.jesimielsilva.service.ColunaService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColunaServiceImpl implements ColunaService {
    private final ColunaRepository colunaRepository;
    private final BoardRepository boardRepository;

    public ColunaServiceImpl(ColunaRepository colunaRepository, BoardRepository boardRepository) {
        this.colunaRepository = colunaRepository;
        this.boardRepository = boardRepository;
    }

    @Override
    @Transactional
    public Coluna criarColuna(Coluna coluna) {
        if (coluna.getBoard() == null) {
            throw new IllegalArgumentException("Coluna precisa estar vinculada a um Board.");
        }

        Board board = boardRepository.findById(coluna.getBoard().getId())
                .orElseThrow(() -> new IllegalArgumentException("Board não encontrado"));

        // Verifica quantas colunas já existem
        List<Coluna> colunas = board.getColunas();

        // Regra: apenas 1 INICIAL
        if (coluna.getTipo() == TipoColuna.INICIAL &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.INICIAL)) {
            throw new IllegalArgumentException("O board já possui uma coluna INICIAL.");
        }

        // Regra: apenas 1 FINAL
        if (coluna.getTipo() == TipoColuna.FINAL &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.FINAL)) {
            throw new IllegalArgumentException("O board já possui uma coluna FINAL.");
        }

        // Regra: apenas 1 CANCELAMENTO
        if (coluna.getTipo() == TipoColuna.CANCELAMENTO &&
                colunas.stream().anyMatch(c -> c.getTipo() == TipoColuna.CANCELAMENTO)) {
            throw new IllegalArgumentException("O board já possui uma coluna de CANCELAMENTO.");
        }

        // ======= Ordem das colunas =======
        if (coluna.getTipo() == TipoColuna.INICIAL) {
            coluna.setOrdem(1); // sempre primeira
        } else if (coluna.getTipo() == TipoColuna.FINAL) {
            coluna.setOrdem(colunas.size() + 1); // será penúltima
        } else if (coluna.getTipo() == TipoColuna.CANCELAMENTO) {
            coluna.setOrdem(colunas.size() + 2); // sempre última
        } else { // PENDENTE
            // inserimos no meio (depois da inicial e antes do final/cancelamento)
            coluna.setOrdem(colunas.size() + 1);
        }

        coluna.setBoard(board);
        return colunaRepository.save(coluna);
    }

    @Override
    public List<Coluna> listarColunasPorBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board não encontrado"));
        return board.getColunas();
    }
}
