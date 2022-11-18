package geurime.database.repository;

import geurime.api.dto.EmotionDto;
import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface KidRepository extends JpaRepository<Kid, Long> {
    List<Kid> findByFamily(Family family);
    @Query(value = "select k from Kid k join fetch k.drawingBoxList where k.id = :kidId")
    Optional<Kid> findByIdWithDrawingBox(@Param("kidId") Long kidId);

    @Query(value = "select new geurime.api.dto.EmotionDto(count(a), count(a), count(a)) from Drawing a where a.drawingBox.kid.id = :kidId and a.emotionAngry > a.emotionHappy and a.emotionAngry > a.emotionSad")
    EmotionDto findEmotionDto(@Param("kidId") Long kidId);

    @Query(value = "select count(a) from Drawing a where a.drawingBox.kid.id = :kidId and a.emotionAngry > a.emotionHappy and a.emotionAngry > a.emotionSad and a.createTime BETWEEN :startDate AND :endDate")
    long countAngry(@Param("kidId") Long kidId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query(value = "select count(a) from Drawing a where a.drawingBox.kid.id = :kidId and a.emotionSad > a.emotionHappy and a.emotionSad > a.emotionAngry and a.createTime BETWEEN :startDate AND :endDate")
    long countSad(@Param("kidId") Long kidId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query(value = "select count(a) from Drawing a where a.drawingBox.kid.id = :kidId and a.emotionHappy > a.emotionAngry and a.emotionHappy > a.emotionSad and a.createTime BETWEEN :startDate AND :endDate")
    long countHappy(@Param("kidId") Long kidId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}