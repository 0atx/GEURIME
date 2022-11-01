package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "emotion_sad")
    private Float emotionSad;

    @Column(name = "emotion_angry")
    private Float emotionAngry;

    @Column(name = "drawing_image_path", nullable = false)
    private String drawingImagePath;

    @Column(name = "is_like", nullable = false)
    private Boolean isLike;

    @Column(name = "is_diary", nullable = false)
    private Boolean isDiary;

    @Column(name = "drawing_diary")
    @Type(type = "org.hibernate.type.TextType")
    private String drawingDiary;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drawing_box_id")
    private DrawingBox drawingBox;

    @Column(name = "drawing_diary_weather")
    private Integer drawingDiaryWeather;

    @Column(name = "drawing_diary_feeling")
    private Integer drawingDiaryFeeling;

    @Column(name = "drawing_diary_wake_up")
    private LocalDateTime drawingDiaryWakeUp;

    @Column(name = "drawing_diary_sleep")
    private LocalDateTime drawingDiarySleep;

    @Builder
    public Drawing(Long id, LocalDateTime createTime, String drawingTitle, Float emotionHappy, Float emotionSad, Float emotionAngry, String drawingImagePath, Boolean isLike, Boolean isDiary, String drawingDiary, DrawingBox drawingBox, Integer drawingDiaryWeather, Integer drawingDiaryFeeling, LocalDateTime drawingDiaryWakeUp, LocalDateTime drawingDiarySleep) {
        this.id = id;
        this.createTime = createTime;
        this.drawingTitle = drawingTitle;
        this.emotionHappy = emotionHappy;
        this.emotionSad = emotionSad;
        this.emotionAngry = emotionAngry;
        this.drawingImagePath = drawingImagePath;
        this.isLike = isLike;
        this.isDiary = isDiary;
        this.drawingDiary = drawingDiary;
        this.drawingBox = drawingBox;
        this.drawingDiaryWeather = drawingDiaryWeather;
        this.drawingDiaryFeeling = drawingDiaryFeeling;
        this.drawingDiaryWakeUp = drawingDiaryWakeUp;
        this.drawingDiarySleep = drawingDiarySleep;
    }

    public void changeDrawingInfo(DrawingBox drawingBox, String drawingTitle, Boolean isLike){
        this.drawingBox = drawingBox;
        this.drawingTitle = drawingTitle;
        this.isLike = isLike;
    }

    public void changeDrawingLocation(DrawingBox drawingBox){
        this.drawingBox = drawingBox;
    }

    /**
     * 그림기록 상세조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingInfoResponse{
        private Long drawingId;
        private Long drawingBoxId;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createTime;
        private String drawingTitle;
        private Float emotionHappy;
        private Float emotionSad;
        private Float emotionAngry;
        private String drawingImagePath;
        private Boolean isLike;
    }

    /**
     * 그림보관함 이미지 미리보기 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingBoxPreviewResponse{
        private Long drawingBoxId;
        private String drawingBoxName;
        private String drawingImagePath;
    }

    /**
     * 그림 갤러리 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingGalleryResponse {
        private Long drawingId;
        private String drawingImagePath;
    }

    /**
     * 그림기록 등록 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawingPostRequest{
        private Long drawingBoxId;
        private String drawingTitle;
    }

    /**
     * 그림기록 수정 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawingPutRequest{
        private Long kidId;
        private Long drawingId;
        private Long drawingBoxId;
        private String drawingTitle;
    }

    public void updateDrawing(DrawingBox drawingBox, String drawingTitle){
        this.drawingBox = drawingBox;
        this.drawingTitle = drawingTitle;
    }

    public void migrationDrawing(DrawingBox drawingBox){
        this.drawingBox = drawingBox;
    }

    /**
     * 그림기록 리스트 보관함 전체이동 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawingMigrationPutRequest{
        private List<Long> drawingIdList;
        private Long drawingBoxId;
    }
}