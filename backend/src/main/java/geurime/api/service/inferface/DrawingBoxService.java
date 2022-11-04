package geurime.api.service.inferface;

import geurime.database.entity.Kid;

public interface DrawingBoxService {
    Kid.KidInfoResponse createDrawingBox(Long kidId, String drawingBoxName);
    Boolean updateDrawingBox(Long drawingBoxId, String drawingBoxName);
    Boolean deleteDrawingBox(Long drawingBoxId);
}
