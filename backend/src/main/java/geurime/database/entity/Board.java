package geurime.database.entity;

import geurime.database.enums.BoardType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BoardImage> boardImages = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @Builder
    public Board(Long id, LocalDateTime createTime, LocalDateTime updateTime, String boardTitle, String boardContent, BoardType boardCategory, Integer boardViews, User user, List<BoardImage> boardImages, List<Comment> commentList) {
        this.id = id;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardCategory = boardCategory;
        this.boardViews = boardViews;
        this.user = user;
        this.boardImages = boardImages;
        this.commentList = commentList;
    }
}