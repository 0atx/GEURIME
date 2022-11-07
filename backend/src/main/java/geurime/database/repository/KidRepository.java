package geurime.database.repository;

import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface KidRepository extends JpaRepository<Kid, Long> {
    List<Kid> findByFamily(Family family);
    @Query(value = "select k from Kid k join fetch k.drawingBoxList where k.id = :kidId")
    Optional<Kid> findByIdWithDrawingBox(@Param("kidId") Long kidId);

}