package geurime.api.controller;

import geurime.api.dto.EmotionDto;
import geurime.api.dto.common.BasicResponse;
import geurime.api.service.KidServiceImpl;
import geurime.database.entity.Kid;
import geurime.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kids")
@Api(tags = {"자녀 정보 API를 제공하는 Controller"})
public class KidController {
    final KidServiceImpl kidService;
    static final String SUCCESS = "success";

    @GetMapping("/{kidId}")
    @ApiOperation(value = "자녀 정보 조회", notes = "자녀 Id를 받아 자녀 정보를 조회한다")
    public ResponseEntity<BasicResponse<Kid.KidMainInfoResponse>> readKidInfo(@PathVariable("kidId") Long kidId) {
        try {
            Kid.KidMainInfoResponse response = kidService.readKidInfo(kidId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/emotion/{kidId}")
    @ApiOperation(value = "자녀 감정 통계 조회", notes = "자녀 Id와 조회할 날짜를 연월(ex : 202208)로 받아 자녀의 그림감정 통계를 조회한다")
    public ResponseEntity<BasicResponse<EmotionDto>> readEmotionCount(@PathVariable("kidId") Long kidId, @RequestParam String yyyy, @RequestParam String MM) {
        try {
            EmotionDto emotionDto = kidService.readEmotionCount(kidId, LocalDate.of(Integer.parseInt(yyyy), Integer.parseInt(MM), 1));
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, emotionDto), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "자녀 등록", notes = "자녀를 등록하고 기본보관함, 그림일기 보관함을 생성한다. 생성된 자녀의 id를 반환한다")
    public ResponseEntity<BasicResponse<Kid.KidInfoResponse>> createKidInfo(@RequestPart(value = "request") Kid.KidPostRequest request,
                                                             @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Kid.KidInfoResponse response = kidService.createKid(request, imageFile);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "자녀 정보수정", notes = "자녀 정보를 수정한다. 수정된 자녀의 id를 반환한다")
    public ResponseEntity<BasicResponse<Kid.KidInfoResponse>> updateKidInfo(@RequestPart(value = "request") Kid.KidPutRequest request,
                                                             @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Kid.KidInfoResponse response = kidService.updateKid(request, imageFile);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "자녀 삭제", notes = "자녀 정보를 삭제한다")
    public ResponseEntity<BasicResponse<String>> deleteKidInfo(@RequestParam Long kidId) {
        try {
            kidService.deleteKid(kidId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, "삭제완료"), HttpStatus.CREATED);
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
