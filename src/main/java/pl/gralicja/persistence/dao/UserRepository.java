package pl.gralicja.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.gralicja.persistence.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    
    User findByFirstName(String firstName);

    @Override
    void delete(User user);

}
