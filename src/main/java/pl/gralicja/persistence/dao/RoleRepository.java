package pl.gralicja.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.gralicja.persistence.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

    @Override
    void delete(Role role);

}
