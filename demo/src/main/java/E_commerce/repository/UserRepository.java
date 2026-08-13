package E_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import E_commerce.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByFirebaseUid(String firebaseUid);

    Optional<User> findByEmail(String email);
}
