package geurime.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "drawing")
public class Drawing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drawing_id", nullable = false)
    private Long id;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "drawing_title", nullable = false, length = 40)
    private String drawingTitle;

    @Column(name = "emotion_happy")
    private Float emotionHappy;

    @Column(name = "emotion_hope")
    private Float emotionHope;

    @Column(name = "emotion_sad")
    private Float emotionSad;

    @Column(name = "emotion_angry")
    private Float emotionAngry;

    @Column(name = "is_diary", nullable = false)
    private Boolean isDiary;

    @Column(name = "drawing_diary")
    @Type(type = "org.hibernate.type.TextType")
    private String drawingDiary;

    @Column(name = "drawing_image_path", nullable = false)
    private String drawingImagePath;

    @Column(name = "is_like", nullable = false)
    private Boolean isLike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drawing_box_id")
    private DrawingBox drawingBox;
    @Builder
    public Drawing(Long id, LocalDateTime createTime, String drawingTitle, Float emotionHappy, Float emotionHope, Float emotionSad, Float emotionAngry, Boolean isDiary, String drawingDiary, String drawingImagePath, Boolean isLike, DrawingBox drawingBox) {
        this.id = id;
        this.createTime = createTime;
        this.drawingTitle = drawingTitle;
        this.emotionHappy = emotionHappy;
        this.emotionHope = emotionHope;
        this.emotionSad = emotionSad;
        this.emotionAngry = emotionAngry;
        this.isDiary = isDiary;
        this.drawingDiary = drawingDiary;
        this.drawingImagePath = drawingImagePath;
        this.isLike = isLike;
        this.drawingBox = drawingBox;
    }

    public void changeDrawingInfo(DrawingBox drawingBox, String drawingTitle, Boolean isLike){
        this.drawingBox = drawingBox;
        this.drawingTitle = drawingTitle;
        this.isLike = isLike;
    }

    public void changeDrawingLocation(DrawingBox drawingBox){
        this.drawingBox = drawingBox;
    }
}