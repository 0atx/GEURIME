package geurime.database.repository;

import geurime.api.dto.CountHeatMapResponse;
import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    List<Drawing> findByDrawingBox_KidAndIsLikeTrue(Kid kid);

    List<Drawing> findByDrawingBox_KidAndDrawingBox_DrawingBoxCategory(Kid kid, BoxType drawingBoxCategory);

    List<Drawing> findByDrawingBox_KidAndCreateTime(Kid kid, LocalDate createTime);

    List<Drawing> findByDrawingBox_KidAndDrawingTitleContains(Kid kid, String drawingTitle);

    Optional<Drawing> findFirstByDrawingBox(DrawingBox drawingBox);

    long countByDrawingBox(DrawingBox drawingBox);

    @Query(value = "select d.drawingBox.kid.family.id from Drawing d")
    Long getFamilyIdByDrawingId(Long drawingId);

    @Query(value = "select dr.createTime as createTime, count(dr.createTime) as count from Drawing dr where dr.drawingBox.kid = :kid group by dr.createTime")
    List<CountHeatMapResponse> findDrawingCountList(@Param("kid") Kid kid);

}