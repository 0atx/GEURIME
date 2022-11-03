package geurime.database.repository;

import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DrawingBoxRepository extends JpaRepository<DrawingBox, Long> {

//        @Query(value = "select u from User u join fetch u.family where u.id = :userId")
//    Optional<User> findByIdFetch(@Param("userId") Long userId);

    @Query(value = "select b from DrawingBox b join fetch b.drawingList where b.id = :drawingBoxId")
    Optional<DrawingBox> findByIdFetch(@Param("drawingBoxId") Long drawingBoxId);

    Optional<DrawingBox> findByKidAndDrawingBoxCategory(Kid kid, BoxType drawingBoxCategory);

}