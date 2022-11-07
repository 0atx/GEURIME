package geurime.database.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
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
    private LocalDate createTime;

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
    public Drawing(Long id, LocalDate createTime, String drawingTitle, Float emotionHappy, Float emotionSad, Float emotionAngry, String drawingImagePath, Boolean isLike, Boolean isDiary, String drawingDiary, DrawingBox drawingBox, Integer drawingDiaryWeather, Integer drawingDiaryFeeling, LocalDateTime drawingDiaryWakeUp, LocalDateTime drawingDiarySleep) {
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

    public void changeDrawingEmotion(float depression, float violence ,float happniess){
        this.emotionSad = depression;
        this.emotionAngry = violence;
        this.emotionHappy = happniess;
    }

    /**
     * 그림기록 업로드 횟수 히트맵
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CountHeatMapResponse {
        @JsonFormat(pattern = "yyyy/MM/dd")
        private LocalDate date;
        private Long count;

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
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate createTime;
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
     * 그림 갤러리 응답 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingGalleryResponse{
        private String drawingBoxName;
        private List<DrawingGalleryDto> dtoList;
    }

    /**
     * 그림 갤러리 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingGalleryDto {
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

    /**
     * 그림보관함, 그림제목 수정
     * @param drawingBox
     * @param drawingTitle
     */
    public void changeDrawingInfo(DrawingBox drawingBox, String drawingTitle){
        this.drawingBox = drawingBox;
        this.drawingTitle = drawingTitle;
    }

    /**
     * 그림보관함 수정
     * @param drawingBox
     */
    public void migrationDrawing(DrawingBox drawingBox){
        this.drawingBox = drawingBox;
    }
    public void changeDrawingImagePath(String imagePath){
        this.drawingImagePath = imagePath;
    }

    /**
     * 그림일기 수정
     * @param drawingTitle
     * @param drawingDiary
     * @param drawingDiaryWeather
     * @param drawingDiaryFeeling
     * @param drawingDiaryWakeUp
     * @param drawingDiarySleep
     */
    public void changeDrawingDiaryInfo(String drawingTitle, String drawingDiary, Integer drawingDiaryWeather, Integer drawingDiaryFeeling, LocalDateTime drawingDiaryWakeUp, LocalDateTime drawingDiarySleep){
        this.drawingTitle = drawingTitle;
        this.drawingDiary = drawingDiary;
        this.drawingDiaryWeather = drawingDiaryWeather;
        this.drawingDiaryFeeling = drawingDiaryFeeling;
        this.drawingDiaryWakeUp = drawingDiaryWakeUp;
        this.drawingDiarySleep = drawingDiarySleep;
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

    /**
     * 그림일기 수정 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawingDiaryPutRequest{
        private Long drawingId;
        private String drawingTitle;
        private String drawingDiary;
        private Integer drawingDiaryWeather;
        private Integer drawingDiaryFeeling;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiaryWakeUp;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiarySleep;
    }

    /**
     * 그림일기 등록 DTO
     */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawingDiaryPostRequest{
        private Long kidId;
        private String drawingTitle;
        private String drawingDiary;
        private String createTime;
        private Integer drawingDiaryWeather;
        private Integer drawingDiaryFeeling;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiaryWakeUp;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiarySleep;
    }

    /**
     * 그림일기 상세조회 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingDiaryInfoResponse{
        private Long drawingId;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate createTime;
        private String drawingTitle;
        private Float emotionHappy;
        private Float emotionSad;
        private Float emotionAngry;
        private String drawingImagePath;
        private String drawingDiary;
        private Integer drawingDiaryWeather;
        private Integer drawingDiaryFeeling;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiaryWakeUp;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime drawingDiarySleep;
    }

    /**
     * 그림일기 목록조회, 제목검색, 날짜검색 DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class DrawingDiaryListResponse{
        private Long drawingId;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate createTime;
        private String drawingTitle;
        private String drawingImagePath;

        @Builder
        public DrawingDiaryListResponse(Long drawingId, LocalDate createTime, String drawingTitle, String drawingImagePath) {
            this.drawingId = drawingId;
            this.createTime = createTime;
            this.drawingTitle = drawingTitle;
            this.drawingImagePath = drawingImagePath;
        }
    }

}