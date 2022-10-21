package geurime.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class DrawingResponse {
    private Long drawingId;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
    private String drawingTitle;
    private Float emotionHappy;
    private Float emotionHope;
    private Float emotionSad;
    private Float emotionAngry;
    private String drawingImagePath;
    private Boolean isLike;

    @Builder
    public DrawingResponse(Long drawingId, LocalDateTime createTime, String drawingTitle, Float emotionHappy, Float emotionHope, Float emotionSad, Float emotionAngry, String drawingImagePath, Boolean isLike) {
        this.drawingId = drawingId;
        this.createTime = createTime;
        this.drawingTitle = drawingTitle;
        this.emotionHappy = emotionHappy;
        this.emotionHope = emotionHope;
        this.emotionSad = emotionSad;
        this.emotionAngry = emotionAngry;
        this.drawingImagePath = drawingImagePath;
        this.isLike = isLike;
    }
}
