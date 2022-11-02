package geurime.api.service.inferface;

import geurime.database.entity.Drawing;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface DrawingDiaryService {
    Drawing.DrawingDiaryInfoResponse readDrawingDiary(Long drawingId);
    List<Drawing.DrawingDiaryListResponse> readAllDrawingDiaryList(Long kidId);
    List<Drawing.DrawingDiaryListResponse> readByDateDrawingDiaryList(Long kidId, LocalDate date);
    List<Drawing.DrawingDiaryListResponse> readByTitleSearchDrawingDiaryList(Long kidId, String keyword);
    Long createDrawingDiary(Drawing.DrawingDiaryPostRequest request, MultipartFile imageFile);
    Long updateDrawingDiary(Drawing.DrawingDiaryPutRequest request, MultipartFile imageFile);
    Boolean deleteDrawingDiary(Long drawingId);
}
