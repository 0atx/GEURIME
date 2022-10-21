package geurime.api.service;

import geurime.api.dto.DrawingPostRequest;
import geurime.api.dto.DrawingPutRequest;
import geurime.api.dto.DrawingResponse;

import java.util.List;

public interface DrawingService {
    Long createDrawing(DrawingPostRequest request); //그림 등록
    DrawingResponse readDrawing(Long drawingId); //그림 조회
    List<DrawingResponse> readKidDrawingList(Long kidId); //아이의 그림 전체조회
    List<DrawingResponse> readLikeDrawingList(Long kidId); //아이의 좋아요 그림 전체조회
    List<DrawingResponse> readDrawingBoxList(Long drawingBoxId); //보관함의 그림 전체조회
    Long updateDrawing(DrawingPutRequest request); //그림 수정
    void updateDrawingLocation(List<Long> drawingIdList, Long drawingBoxId); //리스트에 있는 그림들 지정한 보관함으로 이동
    void deleteDrawing(Long drawingId); //그림 삭제
    void deleteDrawingBox(Long kidId, Long drawingBoxId, Boolean isDelete); //그림 보관함 삭제, 그림 삭제or 이동
}
