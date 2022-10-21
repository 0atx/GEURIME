package geurime.database.repository;

import geurime.database.entity.DrawingBox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingBoxRepository extends JpaRepository<DrawingBox, Long> {
}