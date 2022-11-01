package geurime.database.repository;

import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    List<Drawing> findByDrawingBox_KidAndIsLikeTrue(Kid kid);

//        @Query("select f from FoodInfo f where f.name like concat('%', :name, '%') and (f.foodUser = :userId or f.foodUser = 1) order by length(f.name) asc")
//    List<FoodInfo> findByNameAndFoodUser(String name, Long userId, Pageable pageable);
}