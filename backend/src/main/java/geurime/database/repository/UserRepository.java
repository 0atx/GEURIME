package geurime.database.repository;

import geurime.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndProvider(String email, String provider);

    @Query(value = "select u from User u join fetch u.family where u.id = :userId")
    Optional<User> findByIdFetch(@Param("userId") Long userId);

//    @Query(value = "select DISTINCT c from WedulClasses c left join fetch c.wedulStudentList")


}