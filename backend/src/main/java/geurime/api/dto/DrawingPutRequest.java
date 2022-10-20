package geurime.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DrawingPutRequest {
    private Long drawingId;
    private Long drawingBoxId;
    private String drawingTitle;
    private Boolean isLike;
}
