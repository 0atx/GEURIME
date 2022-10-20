package geurime.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DrawingPostRequest {
    private Long drawingBoxId;
    private String drawingTitle;
    private String drawingImagePath;
}