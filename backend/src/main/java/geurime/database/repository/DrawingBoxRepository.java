package geurime.database.repository;

import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingBoxRepository extends JpaRepository<DrawingBox, Long> {
    DrawingBox findByKidAndDrawingBoxCategory(Kid kid, BoxType drawingBoxCategory);

}