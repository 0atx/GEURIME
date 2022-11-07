package geurime.api.service.inferface;

import geurime.database.entity.Drawing;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DrawingService {
    Drawing.DrawingInfoResponse readDrawingInfo(Long drawingId);
    List<Drawing.DrawingGalleryDto> readLikeDrawingList(Long kidId);
    Drawing.DrawingGalleryResponse readBoxDrawingList(Long kidId, Long drawingBoxId);
    Drawing.DrawingInfoResponse createDrawing(Drawing.DrawingPostRequest request, MultipartFile imageFile);
    Long updateDrawing(Drawing.DrawingPutRequest request);
    Long drawingBoxMigration(Drawing.DrawingMigrationPutRequest request);
    Boolean deleteDrawingBox(Long kidId, Long drawingBoxId, Boolean isDelete);
    Boolean deleteDrawing(Long kidId,Long drawingId);

    List<Drawing.CountHeatMapResponse> readDrawingCountHeatMap(Long kidId);

    List<Drawing.CountHeatMapResponse> readDrawingEmotionHeatMap(Long kidId);
}
