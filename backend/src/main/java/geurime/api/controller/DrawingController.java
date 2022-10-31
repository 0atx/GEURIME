package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingServiceImpl;
import geurime.database.entity.Drawing;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/drawings")
@Api(tags = {"그림 기록 API를 제공하는 Controller"})
public class DrawingController {
    final DrawingServiceImpl drawingService;
    static final String SUCCESS = "success";

    @GetMapping("/{drawingId}")
    @ApiOperation(value = "그림기록 상세조회", notes = "그림기록 id를 받아 상세정보를 조회한다")
    public ResponseEntity<BasicResponse<Drawing.DrawingInfoResponse>> readDrawingInfo(@PathVariable("drawingId") Long drawingId){
        Drawing.DrawingInfoResponse drawingInfoResponse = drawingService.readDrawingInfo(drawingId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingInfoResponse), HttpStatus.OK);
    }

    // 검색 방법 구현해야함
//    @GetMapping("/preview/{kidId}")
//    @ApiOperation(value = "그림보관함 미리보기 조회", notes = "자녀 id를 받아 보관함 미리보기를 조회한다")
//    public ResponseEntity<BasicResponse<Drawing.DrawingBoxPreviewResponse>> readDrawingBoxPreview(@PathVariable("kidId") Long kidId){
//
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingInfoResponse), HttpStatus.OK);
//    }

    @GetMapping("/like/{kidId}")
    @ApiOperation(value = "좋아요 그림기록 리스트 조회", notes = "자녀 id를 받아 좋아요한 그림이미지를 조회한다")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingGalleryResponse>>> readLikeDrawingList(@PathVariable("kidId") Long kidId){
        List<Drawing.DrawingGalleryResponse> drawingGalleryResponses = drawingService.readLikeDrawingList(kidId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingGalleryResponses), HttpStatus.OK);
    }

    @GetMapping("/box/{drawingBoxId}")
    @ApiOperation(value = "그림보관함 그림기록 리스트 조회", notes = "자녀 id로 그림보관함의 주인인지 검증하고 그림보관함 id를 받아 좋아요한 그림이미지를 조회한다")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingGalleryResponse>>> readDrawingBoxDrawingList(@PathVariable("drawingBoxId") Long drawingBoxId, @RequestParam Long kidId){
        List<Drawing.DrawingGalleryResponse> drawingGalleryResponses = drawingService.readBoxDrawingList(kidId, drawingBoxId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingGalleryResponses), HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "그림기록 등록", notes = "그림 보관함과 그림 제목, 이미지 파일을 받아 그림기록을 등록한다.")
    public ResponseEntity<BasicResponse<Long>> createDrawing(@RequestPart Drawing.DrawingPostRequest request, @RequestPart MultipartFile imageFile){
        Long drawingId = drawingService.createDrawing(request, imageFile);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingId), HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "그림기록 수정", notes = "그림 보관함과 그림 제목을 받아 그림기록을 수정한다.")
    public ResponseEntity<BasicResponse<Long>> updateDrawing(@RequestBody Drawing.DrawingPutRequest request){
        Long drawingId = drawingService.updateDrawing(request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingId), HttpStatus.OK);
    }

    @PutMapping("/migration")
    @ApiOperation(value = "그림기록 리스트 보관함 이동", notes = "그림 보관함 id 리스트와 이동시킬 그림보관함의 id를 받아 그림기록 보관함을 수정한다.")
    public ResponseEntity<BasicResponse<Long>> migrateDrawingList(@RequestBody Drawing.DrawingMigrationPutRequest request){
        Long drawingBoxId = drawingService.drawingBoxMigration(request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingBoxId), HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "그림기록 삭제", notes = "유저 id로 주인인지 검증하고 그림기록을 삭제한다.")
    public ResponseEntity<BasicResponse<String>> deleteDrawing(@RequestParam Long kidId, @RequestParam Long drawingId){
        Boolean isDelete = drawingService.deleteDrawing(kidId, drawingId);
        String result = isDelete == true ? "삭제완료" : "삭제실패";
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, result), HttpStatus.OK);
    }

    @DeleteMapping("/box")
    @ApiOperation(value = "그림기록 삭제", notes = "유저 id로 주인인지 검증하고 그림기록을 삭제한다.")
    public ResponseEntity<BasicResponse<String>> deleteDrawingBox(@RequestParam Long kidId, @RequestParam Long drawingBoxId, @RequestParam Boolean isDelete){
        Boolean deleteResult = drawingService.deleteDrawingBox(kidId, drawingBoxId, isDelete);
        String result = deleteResult == true ? "삭제완료" : "삭제실패";
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, result), HttpStatus.OK);
    }

    /**
     * 기본 Response 형식 DTO
     *
     * @param message 메세지 ex) 성공 : "SUCCESS"
     * @param data    반환할 데이터
     * @return ResponseEntity의 Body
     */
    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
