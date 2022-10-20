package geurime.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class DrawingRequest{
    private Long drawingBoxId;
    private String drawingTitle;
    private String drawingImagePath;
}