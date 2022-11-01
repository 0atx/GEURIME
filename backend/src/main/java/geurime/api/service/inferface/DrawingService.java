package geurime.api.service.inferface;

import geurime.database.entity.Drawing;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DrawingService {
    Drawing.DrawingInfoResponse readDrawingInfo(Long drawingId);
    List<Drawing.DrawingBoxPreviewResponse> readDrawingBoxPreviewList(Long kidId);
    List<Drawing.DrawingGalleryResponse> readLikeDrawingList(Long kidId);
    List<Drawing.DrawingGalleryResponse> readBoxDrawingList(Long kidId, Long drawingBoxId);
    Long createDrawing(Drawing.DrawingPostRequest request, MultipartFile imageFile);
    Long updateDrawing(Drawing.DrawingPutRequest request);
    Long drawingBoxMigration(Drawing.DrawingMigrationPutRequest request);
    Boolean deleteDrawingBox(Long kidId, Long drawingBoxId, Boolean isDelete);
    Boolean deleteDrawing(Long kidId,Long drawingId);

    // AI 분석 결과값 넣어주는 메서드 필요
}
