package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingDiaryServiceImpl;
import geurime.database.entity.Drawing;
import geurime.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
@Api(tags = {"그림일기 API를 제공하는 Controller"})
public class DrawingDiaryController {
    final DrawingDiaryServiceImpl drawingDiaryService;
    static final String SUCCESS = "success";

    @GetMapping("/info/{drawingId}")
    @ApiOperation(value = "그림일기 상세조회", notes = "그림일기 id를 받아 상세정보를 조회한다.")
    public ResponseEntity<BasicResponse<Drawing.DrawingDiaryInfoResponse>> readDrawingDiaryInfo(@PathVariable Long drawingId) {
        try {
            Drawing.DrawingDiaryInfoResponse response = drawingDiaryService.readDrawingDiary(drawingId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{kidId}")
    @ApiOperation(value = "자녀의 그림일기 전체조회", notes = "자녀 id를 받아 보유한 그림일기 목록을 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readAllKidDrawingDiaryList(@PathVariable Long kidId) {
        try {
            List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readAllDrawingDiaryList(kidId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/date/{kidId}")
    @ApiOperation(value = "자녀의 그림일기 날짜조회", notes = "날짜에 해당하는 그림일기 목록을 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readByDateDrawingDiaryList(@PathVariable Long kidId, @RequestParam String date) {
        try {
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readByDateDrawingDiaryList(kidId, localDate);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/title/{kidId}")
    @ApiOperation(value = "자녀의 그림일기 제목검색", notes = "자녀의 그림일기 제목으로 검색하여 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readBySearchTitleDrawingDiaryList(@PathVariable Long kidId, @RequestParam String keyword) {
        try {
            List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readByTitleSearchDrawingDiaryList(kidId, keyword);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    @ApiOperation(value = "자녀의 그림일기 등록", notes = "자녀의 그림일기를 등록한다.")
    public ResponseEntity<BasicResponse<Drawing.DrawingDiaryInfoResponse>> createDrawingDiary(@RequestPart(value = "request") Drawing.DrawingDiaryPostRequest request,
                                                                                              @RequestPart(value = "imageFile", required = true) MultipartFile imageFile) {
        try {
            Drawing.DrawingDiaryInfoResponse response = drawingDiaryService.createDrawingDiary(request, imageFile);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{drawingId}")
    @ApiOperation(value = "자녀의 그림일기 수정", notes = "자녀의 그림일기를 수정한다.")
    public ResponseEntity<BasicResponse<Drawing.DrawingDiaryInfoResponse>> updateDrawingDiary(@PathVariable Long drawingId, @RequestPart(value = "request") Drawing.DrawingDiaryPutRequest request,
                                                                                              @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Drawing.DrawingDiaryInfoResponse response = drawingDiaryService.updateDrawingDiary(request, imageFile);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{drawingId}")
    @ApiOperation(value = "자녀의 그림일기 삭제", notes = "자녀의 그림일기를 삭제한다.")
    public ResponseEntity<BasicResponse<Boolean>> deleteDrawingDiary(@PathVariable Long drawingId) {
        try {
            Boolean isDelete = drawingDiaryService.deleteDrawingDiary(drawingId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, isDelete), HttpStatus.OK);
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
