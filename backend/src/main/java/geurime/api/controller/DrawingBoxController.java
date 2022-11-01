package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingBoxServiceImpl;
import geurime.api.service.DrawingServiceImpl;
import geurime.database.entity.Drawing;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/drawings/box")
@Api(tags = {"그림 보관함 API를 제공하는 Controller"})
public class DrawingBoxController {
    final DrawingBoxServiceImpl drawingBoxService;
    final DrawingServiceImpl drawingService;
    static final String SUCCESS = "success";

    @GetMapping("/{drawingBoxId}")
    @ApiOperation(value = "그림보관함 그림기록 리스트 조회", notes = "자녀 id로 그림보관함의 주인인지 검증하고 그림보관함 id를 받아 좋아요한 그림이미지를 조회한다")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingGalleryResponse>>> readDrawingBoxDrawingList(@PathVariable("drawingBoxId") Long drawingBoxId, @RequestParam Long kidId){
        List<Drawing.DrawingGalleryResponse> drawingGalleryResponses = drawingService.readBoxDrawingList(kidId, drawingBoxId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingGalleryResponses), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "그림보관함 추가", notes = "커스텀 그림보관함을 생성한다.")
    public ResponseEntity<BasicResponse<Long>> createDrawingBox(@RequestParam Long kidId, @RequestParam String drawingBoxName){
        Long drawingBoxId = drawingBoxService.createDrawingBox(kidId, drawingBoxName);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingBoxId), HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "그림보관함 제목수정", notes = "커스텀 그림보관함의 제목을 수정한다.")
    public ResponseEntity<BasicResponse<Boolean>> updateDrawingBox(@RequestParam Long drawingBoxId, @RequestParam String drawingBoxName){
        Boolean isChange = drawingBoxService.updateDrawingBox(drawingBoxId, drawingBoxName);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, isChange), HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "그림기록 보관함 삭제", notes = "isDelete가 true면 포함되어있던 사진도 전부 삭제, isDelete가 false면 포함되어있던 사진 기본보관함으로 이동")
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
