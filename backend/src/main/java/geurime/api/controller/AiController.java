package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.AiPredictServiceImpl;
import geurime.database.entity.Drawing;
import geurime.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
@Api(tags = {"Ai 그림분석을 실행하는 Controller"})
public class AiController {
    final AiPredictServiceImpl aiPredictService;
    static final String SUCCESS = "success";

    @GetMapping("/{drawingId}")
    @ApiOperation(value = "Ai 그림분석", notes = "그림기록 id를 받아 Ai 그림분석을 하여 결과를 저장한다.")
    public ResponseEntity<BasicResponse<String>> aiPredict(@PathVariable("drawingId") Long drawingId) {
        try{
            aiPredictService.predict(drawingId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, "분석완료"), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), "분석실패"), HttpStatus.BAD_REQUEST);
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
