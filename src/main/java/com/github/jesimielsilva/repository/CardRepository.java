package com.github.jesimielsilva.repository;

import com.github.jesimielsilva.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByColunaId(Long colunaId);
}
