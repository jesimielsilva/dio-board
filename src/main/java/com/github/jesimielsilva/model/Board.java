package com.github.jesimielsilva.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    // Um board é composto por colunas
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("ordem ASC") // garante a ordem correta das colunas
    private List<Coluna> colunas = new ArrayList<>();

    public Board() {}

    public Board(String nome) {
        this.nome = nome;
    }

    // ---------- getters e setters ----------
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<Coluna> getColunas() { return colunas; }
    public void setColunas(List<Coluna> colunas) { this.colunas = colunas; }

    public void adicionarColuna(Coluna coluna) {
        coluna.setBoard(this);
        this.colunas.add(coluna);
    }
}
