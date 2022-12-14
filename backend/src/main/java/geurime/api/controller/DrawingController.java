package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingServiceImpl;
import geurime.database.entity.Drawing;
import geurime.api.dto.CountHeatMapResponse;
import geurime.exception.CustomException;
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
        try {
            Drawing.DrawingInfoResponse drawingInfoResponse = drawingService.readDrawingInfo(drawingId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingInfoResponse), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/like/{kidId}")
    @ApiOperation(value = "좋아요 그림기록 리스트 조회", notes = "자녀 id를 받아 좋아요한 그림이미지를 조회한다")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingGalleryDto>>> readLikeDrawingList(@PathVariable("kidId") Long kidId){
        try {
            List<Drawing.DrawingGalleryDto> drawingGalleryResponse = drawingService.readLikeDrawingList(kidId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingGalleryResponse), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/heat-map/{kidId}")
    @ApiOperation(value = "그림기록 통계 조회", notes = "자녀 id를 받아 날짜별로 업로드한 횟수를 그림이미지를 조회한다")
    public ResponseEntity<BasicResponse<List<CountHeatMapResponse>>> readDrawingCount(@PathVariable("kidId") Long kidId){
        try {
            List<CountHeatMapResponse> countHeatMapResponseList = drawingService.readDrawingCountHeatMap(kidId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, countHeatMapResponseList), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "그림기록 등록", notes = "그림 보관함과 그림 제목, 이미지 파일을 받아 그림기록을 등록한다.")
    public ResponseEntity<BasicResponse<Drawing.DrawingInfoResponse>> createDrawing(@RequestPart(value = "imageFile") MultipartFile imageFile, @RequestPart(value = "request") Drawing.DrawingPostRequest request){
        try {
            Drawing.DrawingInfoResponse response = drawingService.createDrawing(request, imageFile);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{drawingId}")
    @ApiOperation(value = "그림기록 수정", notes = "그림 보관함과 그림 제목을 받아 그림기록을 수정한다.")
    public ResponseEntity<BasicResponse<Long>> updateDrawing(@PathVariable Long drawingId ,@RequestBody Drawing.DrawingPutRequest request){
        try {
            drawingService.updateDrawing(request);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingId), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/migration/{kidId}")
    @ApiOperation(value = "그림기록 리스트 보관함 이동", notes = "그림 보관함 id 리스트와 이동시킬 그림보관함의 id를 받아 그림기록 보관함을 수정한다.")
    public ResponseEntity<BasicResponse<Long>> migrateDrawingList(@PathVariable Long kidId ,@RequestBody Drawing.DrawingMigrationPutRequest request){
        try {
            Long drawingBoxId = drawingService.drawingBoxMigration(request);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingBoxId), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{drawingId}")
    @ApiOperation(value = "그림기록 삭제", notes = "유저 id로 주인인지 검증하고 그림기록을 삭제한다.")
    public ResponseEntity<BasicResponse<String>> deleteDrawing(@RequestParam Long kidId, @PathVariable Long drawingId){
        try {
            Boolean isDelete = drawingService.deleteDrawing(kidId, drawingId);
            String result = isDelete == true ? "삭제완료" : "삭제실패";
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, result), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
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
