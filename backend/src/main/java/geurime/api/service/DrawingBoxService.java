package geurime.api.service;

public interface DrawingBoxService {
    Long createDrawingBox(Long kidId, String drawingBoxName);
    Boolean updateDrawingBox(Long drawingBoxId, String drawingBoxName);
    Boolean deleteDrawingBox(Long drawingBoxId);
}
