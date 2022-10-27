package geurime.database.repository;

import geurime.database.entity.Board;
import geurime.database.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    long countByBoard(Board board);
}