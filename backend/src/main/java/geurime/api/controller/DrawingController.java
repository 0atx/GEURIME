package geurime.api.controller;

import geurime.api.dto.DrawingPostRequest;
import geurime.api.dto.DrawingResponse;
import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingServiceImpl;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/drawing")
public class DrawingController {

    final DrawingServiceImpl drawingService;
    static final String SUCCESS = "success";

    @GetMapping("/{drawingId}")
    @ApiOperation(value = "그림 기록 조회", notes = "그림 기록을 id로 조회한다")
    @ApiImplicitParam(name = "drawingId", value = "그림 기록 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<DrawingResponse>> readDrawing(@PathVariable("drawingId") Long drawingId) {
        DrawingResponse response = drawingService.readDrawing(drawingId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @GetMapping("/preview/{kidId}")
    @ApiOperation(value = "자녀의 그림 기록 전체조회", notes = "자녀id로 전체 그림기록을 조회한다")
    @ApiImplicitParam(name = "kidId", value = "자녀 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<DrawingResponse>> readKidDrawing(@PathVariable("kidId") Long drawingId) {
        DrawingResponse response = drawingService.readDrawing(drawingId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "그림 기록 등록", notes = "그림 기록을 등록하고 저장된 그림의 id를 반환한다")
    @ApiImplicitParam(name = "drawingRequest", value = "그림 기록 request", required = true, dataTypeClass = DrawingPostRequest.class)
    public ResponseEntity<BasicResponse<Long>> createDrawing(@RequestBody DrawingPostRequest drawingRequest) {
        Long drawingId = drawingService.createDrawing(drawingRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, drawingId), HttpStatus.OK);
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
