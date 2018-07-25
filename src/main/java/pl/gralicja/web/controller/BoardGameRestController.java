package pl.gralicja.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.gralicja.persistence.dao.BoardGameRepository;
import pl.gralicja.persistence.model.BoardGame;

@RestController
@RequestMapping("/restBoardGame")
public class BoardGameRestController {

	@Autowired
	BoardGameRepository boardGameRepository;
	
	@GetMapping("/")
	public List<BoardGame> getAllBoardGames(){
		return boardGameRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public BoardGame getOne(@PathVariable Long id) {
		return boardGameRepository.findOne(id);
	}
}
