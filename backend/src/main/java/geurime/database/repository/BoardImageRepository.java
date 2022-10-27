package geurime.database.repository;

import geurime.database.entity.Board;
import geurime.database.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
    List<BoardImage> findByBoard(Board board);
    Optional<BoardImage> findFirstByBoard(Board board);
}