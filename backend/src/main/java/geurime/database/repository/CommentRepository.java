package geurime.database.repository;

import geurime.database.entity.Board;
import geurime.database.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    long countByBoard(Board board);

    List<Comment> findByBoard(Board board);

    @Query(value = "select u.id from User u where u.id = " +
            "(select b.user.id from Board b where b.id = " +
            "(select c.board.id from Comment c where c.id = :commentId))")
    Long getUserIdByCommentId(Long commentId);
}