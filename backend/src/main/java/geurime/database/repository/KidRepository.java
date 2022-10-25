package geurime.database.repository;

import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KidRepository extends JpaRepository<Kid, Long> {
    List<Kid> findByFamily(Family family);

}