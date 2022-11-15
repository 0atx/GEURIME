package geurime.api.service.inferface;

import geurime.database.entity.Comment;

public interface CommentService {
    Comment.CommentResponse createComment(Comment.CommentPostRequest request);
    Comment.CommentResponse updateComment(Comment.CommentPutRequest request);
    Boolean deleteComment(Long userId, Long commentId);
}
