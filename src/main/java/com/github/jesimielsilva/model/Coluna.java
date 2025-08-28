package com.github.jesimielsilva.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @JsonBackReference("board-colunas")
    private Board board;

    @OneToMany(mappedBy = "coluna", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("coluna-cards")
    private List<Card> cards = new ArrayList<>();

    public Coluna() {}

    // Construtor sem board (caso queira criar separado)
    public Coluna(String nome, int ordem, TipoColuna tipo) {
        this.nome = nome;
        this.ordem = ordem;
        this.tipo = tipo;
    }

    // Construtor com board (para criar já amarrada ao board)
    public Coluna(String nome, int ordem, TipoColuna tipo, Board board) {
        this.nome = nome;
        this.ordem = ordem;
        this.tipo = tipo;
        this.board = board;
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

    public List<Card> getCards() { return cards; }
    public void setCards(List<Card> cards) { this.cards = cards; }

}
