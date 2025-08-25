package com.github.jesimielsilva.model;

import jakarta.persistence.*;

@Entity
@Table(name = "colunas")
public class Coluna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int ordem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoColuna tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    public Coluna() {}

    public Coluna(String nome, int ordem, TipoColuna tipo) {
        this.nome = nome;
        this.ordem = ordem;
        this.tipo = tipo;
    }

    // ---------- getters e setters ----------
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getOrdem() { return ordem; }
    public void setOrdem(int ordem) { this.ordem = ordem; }

    public TipoColuna getTipo() { return tipo; }
    public void setTipo(TipoColuna tipo) { this.tipo = tipo; }

    public Board getBoard() { return board; }
    public void setBoard(Board board) { this.board = board; }
}
