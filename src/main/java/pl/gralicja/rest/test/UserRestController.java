package pl.gralicja.rest.test;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.gralicja.persistence.dao.UserRepository;
import pl.gralicja.persistence.model.User;

@RestController
@RequestMapping("/restUsers")
public class UserRestController {
	
	@Autowired
	UserRepository ur;

	@RequestMapping("/hello")
	public String hello() {
		return "{hello:	World}";
	}
	
	@GetMapping("/")
	public List<User> getAllUsers() {
		return ur.findAll();
	}
}
