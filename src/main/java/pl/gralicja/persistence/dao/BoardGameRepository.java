package pl.gralicja.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.gralicja.persistence.model.BoardGame;

public interface BoardGameRepository extends JpaRepository<BoardGame, Long>{
	
	BoardGame findByTitle(String title);

}
