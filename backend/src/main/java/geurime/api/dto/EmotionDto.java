package geurime.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmotionDto {
    private Long angry;
    private Long sad;
    private Long happy;

    @Builder
    public EmotionDto(Long angry, Long sad, Long happy) {
        this.angry = angry;
        this.sad = sad;
        this.happy = happy;
    }
}
