package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.DrawingDiaryServiceImpl;
import geurime.database.entity.Drawing;
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
        Drawing.DrawingDiaryInfoResponse response = drawingDiaryService.readDrawingDiary(drawingId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @GetMapping("/{kidId}")
    @ApiOperation(value = "자녀의 그림일기 전체조회", notes = "자녀 id를 받아 보유한 그림일기 목록을 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readAllKidDrawingDiaryList(@PathVariable Long kidId) {
        List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readAllDrawingDiaryList(kidId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/date")
    @ApiOperation(value = "자녀의 그림일기 날짜조회", notes = "날짜에 해당하는 그림일기 목록을 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readByDateDrawingDiaryList(@RequestParam Long kidId, @RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readByDateDrawingDiaryList(kidId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/title")
    @ApiOperation(value = "자녀의 그림일기 제목검색", notes = "자녀의 그림일기 제목으로 검색하여 조회한다.")
    public ResponseEntity<BasicResponse<List<Drawing.DrawingDiaryListResponse>>> readBySearchTitleDrawingDiaryList(@RequestParam Long kidId, @RequestParam String keyword) {
        List<Drawing.DrawingDiaryListResponse> responseList = drawingDiaryService.readByTitleSearchDrawingDiaryList(kidId, keyword);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

//    @PostMapping
//    @ApiOperation(value = "자녀의 그림일기 제목검색", notes = "자녀의 그림일기 제목으로 검색하여 조회한다.")
//    public ResponseEntity<BasicResponse<Long>> createDrawingDiary(@RequestPart Drawing.DrawingDiaryPostRequest request, @RequestPart MultipartFile imageFile) {
//
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, null), HttpStatus.OK);
//    }

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
