package geurime.database.repository;

import geurime.database.entity.Board;
import geurime.database.enums.BoardType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select distinct b from Board b left join fetch b.commentList")
    Slice<Board> findAllJPQLFetch(PageRequest pageRequest);

    @EntityGraph(attributePaths = {"commentList"}, type = EntityGraph.EntityGraphType.LOAD)
    Slice<Board> findByBoardCategory(BoardType boardCategory, PageRequest pageRequest);

    @EntityGraph(attributePaths = {"commentList"}, type = EntityGraph.EntityGraphType.LOAD)
    Slice<Board> findByBoardCategoryAndBoardTitleContains(BoardType boardCategory, String keyword, PageRequest pageRequest);

    @Override
    @EntityGraph(attributePaths = {"commentList"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<Board> findById(Long aLong);
}