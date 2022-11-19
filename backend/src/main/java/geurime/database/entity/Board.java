package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import geurime.database.enums.BoardType;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id", nullable = false)
    private Long id;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @Column(name = "board_title", nullable = false, length = 50)
    private String boardTitle;

    @Column(name = "board_content", nullable = false)
    @Type(type = "org.hibernate.type.TextType")
    private String boardContent;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_category", nullable = false)
    private BoardType boardCategory;

    @Column(name = "board_views", nullable = false)
    private Integer boardViews;

    @Column(name = "board_image_path")
    private String boardImagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @Builder
    public Board(Long id, LocalDateTime createTime, LocalDateTime updateTime, String boardTitle, String boardContent,
                 BoardType boardCategory, Integer boardViews, String boardImagePath, User user, List<Comment> commentList) {
        this.id = id;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardCategory = boardCategory;
        this.boardViews = boardViews;
        this.boardImagePath = boardImagePath;
        this.user = user;
        this.commentList = commentList;
    }
    /**
     * 게시글 조회수 1 증가
     */
    public void increaseBoardViews(){
        this.boardViews += 1;
    }

    public void updateBoard(Board.BoardPutRequest request){
        BoardType boardType = null;
        try {
            boardType = BoardType.valueOf(request.getBoardType());
        }catch (IllegalArgumentException e){
            throw new CustomException(CustomExceptionList.BOARD_TYPE_NOT_FOUND_ERROR);
        }
        this.boardCategory = boardType;
        this.boardTitle = request.getBoardTitle();
        this.boardContent = request.getBoardContent();
        this.updateTime = LocalDateTime.now();
    }

    public void changeBoardImage(String boardImagePath){
        this.boardImagePath = boardImagePath;
    }

    /**
     * 게시글 수정 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BoardPutRequest{
        private Long boardId;
        private String boardTitle;
        private String boardContent;
        private String boardType;
    }

    /**
     * 게시글 등록 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BoardPostRequest{
        private Long userId;
        private String boardTitle;
        private String boardContent;
        private String boardCategory;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BoardTitleResponse{
        private Long boardId;
        private Long userId;
        private String userNickname;
        private String userProfileImage;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createTime;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updateTime;
        private String boardTitle;
        private String boardCategory;
        private String boardImagePath;
        private Integer boardViews;
        private Integer commentCount;
    }

    /**
     * 게시글 상세 조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class BoardInfoResponse{
        private Long boardId;
        private Long writerId;
        private String writerNickname;
        private String writerProfile;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createTime;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updateTime;
        private String boardTitle;
        private String boardContent;
        private String boardCategory;
        private Integer boardViews;

        private String boardImagePath;
        List<BoardCommentDto> boardCommentDtoList;

        @Builder
        public BoardInfoResponse(Long boardId, Long writerId, String writerNickname, String writerProfile,
                                 LocalDateTime createTime, LocalDateTime updateTime, String boardTitle, String boardContent,
                                 String boardCategory, Integer boardViews, String boardImagePath, List<BoardCommentDto> boardCommentDtoList) {
            this.boardId = boardId;
            this.writerId = writerId;
            this.writerNickname = writerNickname;
            this.writerProfile = writerProfile;
            this.createTime = createTime;
            this.updateTime = updateTime;
            this.boardTitle = boardTitle;
            this.boardContent = boardContent;
            this.boardCategory = boardCategory;
            this.boardViews = boardViews;
            this.boardImagePath = boardImagePath;
            this.boardCommentDtoList = boardCommentDtoList;
        }
    }

    /**
     * 게시판 댓글 조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class BoardCommentDto{
        private Long commentId;
        private Long commentUserId;
        private String commentUserProfile;
        private String commentUserNickname;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createTime;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updateTime;
        private String commentContent;

        @Builder
        public BoardCommentDto(Long commentId, Long commentUserId, String commentUserProfile, String commentUserNickname, LocalDateTime createTime, LocalDateTime updateTime, String commentContent) {
            this.commentId = commentId;
            this.commentUserId = commentUserId;
            this.commentUserProfile = commentUserProfile;
            this.commentUserNickname = commentUserNickname;
            this.createTime = createTime;
            this.updateTime = updateTime;
            this.commentContent = commentContent;
        }
    }

}