package com.github.jesimielsilva.service.impl;

import com.github.jesimielsilva.model.Board;
import com.github.jesimielsilva.model.Coluna;
import com.github.jesimielsilva.model.TipoColuna;
import com.github.jesimielsilva.repository.BoardRepository;
import com.github.jesimielsilva.repository.ColunaRepository;
import com.github.jesimielsilva.service.BoardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final ColunaRepository colunaRepository;

    public BoardServiceImpl(BoardRepository boardRepository, ColunaRepository colunaRepository) {
        this.boardRepository = boardRepository;
        this.colunaRepository = colunaRepository;
    }

    @Override
    public Board salvar(Board board) {
        // Salva o board primeiro
        Board savedBoard = boardRepository.save(board);

        // Se não houver colunas, cria as padrão
        if (savedBoard.getColunas() == null || savedBoard.getColunas().isEmpty()) {
            List<Coluna> colunasPadrao = List.of(
                    new Coluna("A Fazer", 1, TipoColuna.INICIAL, savedBoard),
                    new Coluna("Em Progresso", 2, TipoColuna.PENDENTE, savedBoard),
                    new Coluna("Concluído", 3, TipoColuna.FINAL, savedBoard),
                    new Coluna("Cancelado", 4, TipoColuna.CANCELAMENTO, savedBoard)
            );

            colunasPadrao.forEach(colunaRepository::save);
            savedBoard.setColunas(colunasPadrao);
        }

        return savedBoard;
    }


    @Override
    public List<Board> listarTodos() {
        return boardRepository.findAll();
    }

    @Override
    public Board buscarPorId(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board não encontrado"));
        // força carregamento das colunas (lazy)
        board.getColunas().size();
        return board;
    }

}
