package geurime.api.service.inferface;

import geurime.database.entity.Comment;

public interface CommentService {
    Long createComment(Comment.CommentPostRequest request);
    Long updateComment(Comment.CommentPutRequest request);
    Boolean deleteComment(Long userId, Long commentId);
}
