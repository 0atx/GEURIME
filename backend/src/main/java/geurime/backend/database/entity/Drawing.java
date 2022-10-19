package geurime.backend.database.entity;

import lombok.AccessLevel;
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

    @Column(name = "create_time", nullable = false)
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

}