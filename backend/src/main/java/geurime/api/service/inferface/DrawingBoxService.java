package geurime.api.service.inferface;

public interface DrawingBoxService {
    Long createDrawingBox(Long kidId, String drawingBoxName);
    Boolean updateDrawingBox(Long drawingBoxId, String drawingBoxName);
    Boolean deleteDrawingBox(Long drawingBoxId);
}
