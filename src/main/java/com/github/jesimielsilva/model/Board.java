package com.github.jesimielsilva.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("board-colunas")
    private List<Coluna> colunas = new ArrayList<>();

    // construtores, getters e setters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Coluna> getColunas() {
        return colunas;
    }
    public void setColunas(List<Coluna> colunas) {
        this.colunas = colunas;
        for (Coluna coluna : colunas) {
            coluna.setBoard(this); // garante consistência bidirecional
        }
    }
}
