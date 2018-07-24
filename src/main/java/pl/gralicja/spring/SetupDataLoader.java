package pl.gralicja.spring;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import pl.gralicja.persistence.dao.BoardGameRepository;
import pl.gralicja.persistence.dao.PrivilegeRepository;
import pl.gralicja.persistence.dao.RoleRepository;
import pl.gralicja.persistence.dao.UserRepository;
import pl.gralicja.persistence.model.BoardGame;
import pl.gralicja.persistence.model.Privilege;
import pl.gralicja.persistence.model.Role;
import pl.gralicja.persistence.model.User;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private BoardGameRepository boardGameRepository;

    // API

    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }

        // == create initial privileges
        final Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        final Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        final Privilege passwordPrivilege = createPrivilegeIfNotFound("CHANGE_PASSWORD_PRIVILEGE");

        // == create initial roles
        final List<Privilege> adminPrivileges = new ArrayList<Privilege>(Arrays.asList(readPrivilege, writePrivilege, passwordPrivilege));
        final List<Privilege> userPrivileges = new ArrayList<Privilege>(Arrays.asList(readPrivilege, passwordPrivilege));
        final Role adminRole = createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", userPrivileges);

        // == create initial user
        createUserIfNotFound("test@test.com", "Test", "test", new ArrayList<Role>(Arrays.asList(adminRole)));
        
        // == create initial boardGame
        createBoardGameIfNotFound("Dixit", "Najlepsza gra dla rodziny i znajomych", "Karty i gry karciane", "Rebel", 3, 6, 8, 0.5);
        createBoardGameIfNotFound("Wsiasc do pociagu", "Rozgrywka polega na laczeniu tras kolejowych na mapie Stanow Zjednoczonych", "Strategiczne i ekonomiczne", "Rebel", 2, 5, 10, 0.75);

        alreadySetup = true;
    }

    @Transactional
    private final Privilege createPrivilegeIfNotFound(final String name) {
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilege = privilegeRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    private final Role createRoleIfNotFound(final String name, final Collection<Privilege> privileges) {
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
        }
        role.setPrivileges(privileges);
        role = roleRepository.save(role);
        return role;
    }

    @Transactional
    private final User createUserIfNotFound(final String email, final String firstName, final String password, final Collection<Role> roles) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setFirstName(firstName);
            user.setPassword(passwordEncoder.encode(password));
            user.setEmail(email);
            user.setEnabled(true);
        }
        user.setRoles(roles);
        user = userRepository.save(user);
        return user;
    }
    
    @Transactional
    private final BoardGame createBoardGameIfNotFound(final String title, final String description, final String category, final String publisher, 
    		final int minNumOfPlayers, final int maxNumOfPlayers, final int minPlayerAge, final double gameLength) {
    	BoardGame boardGame = boardGameRepository.findByTitle(title);
    	if(boardGame == null) {
    		boardGame = new BoardGame(title, description, category, publisher, minNumOfPlayers, maxNumOfPlayers, minPlayerAge, gameLength);
    		boardGame = boardGameRepository.save(boardGame);
    	}
        return boardGame;
    }

}