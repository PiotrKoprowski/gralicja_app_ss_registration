package pl.gralicja.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import pl.gralicja.persistence.dao.BoardGameRepository;
import pl.gralicja.persistence.model.BoardGame;

public class BoardGameConverter implements Converter<String, BoardGame>{
	
	@Autowired
	BoardGameRepository boardGameRepository;
	
	public BoardGame convert(String id) {
		return boardGameRepository.findOne(Long.parseLong(id));
	}
}
