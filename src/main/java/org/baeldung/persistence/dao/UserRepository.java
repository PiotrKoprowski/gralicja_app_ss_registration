package org.baeldung.persistence.dao;

import org.baeldung.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    
    User findByFirstName(String firstName);

    @Override
    void delete(User user);

}
