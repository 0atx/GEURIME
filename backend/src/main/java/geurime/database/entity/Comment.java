package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Long id;

    @Column(name = "comment_user_id", nullable = false)
    private Long commentUserId;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Builder
    public Comment(Long id, Long commentUserId, LocalDateTime createTime, LocalDateTime updateTime, String commentContent, Board board) {
        this.id = id;
        this.commentUserId = commentUserId;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.commentContent = commentContent;
        this.board = board;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CommentPostRequest{
        private Long boardId;
        private Long commentUserId;
        private String commentContent;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CommentPutRequest{
        private Long userId;
        private Long commentId;
        private String commentContent;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class CommentResponse{
        private Long id;
        private Long commentUserId;
        private String commentUserProfile;
        private String commentUserNickname;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createTime;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updateTime;
        private String commentContent;

        @Builder
        public CommentResponse(Long id, Long commentUserId, String commentUserProfile, String commentUserNickname, LocalDateTime createTime, LocalDateTime updateTime, String commentContent) {
            this.id = id;
            this.commentUserId = commentUserId;
            this.commentUserProfile = commentUserProfile;
            this.commentUserNickname = commentUserNickname;
            this.createTime = createTime;
            this.updateTime = updateTime;
            this.commentContent = commentContent;
        }
    }

    public void updateComment(String commentContent){
        this.commentContent = commentContent;
    }
}