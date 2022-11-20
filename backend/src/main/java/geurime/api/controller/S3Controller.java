//package geurime.api.controller;
//
//import geurime.api.dto.common.BasicResponse;
//import geurime.config.s3.S3Uploader;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import springfox.documentation.annotations.ApiIgnore;
//
//@ApiIgnore
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/upload")
//@Api(tags = {"S3 이미지 업로드 API를 제공하는 Controller"})
//public class S3Controller {
//    private final S3Uploader s3Uploader;
//    static final String SUCCESS = "success";
//
//    @PostMapping
//    @ApiOperation(value = "이미지 업로드", notes = "이미지를 업로드하고 생성된 url을 반환한다.")
//    public ResponseEntity<BasicResponse<String>> uploadImage(@RequestParam("image") MultipartFile multipartFile) {
//        String imageUrl = "noImage";
//        try {
//            //imageUrl 사진경로
//            imageUrl = s3Uploader.uploadFile(multipartFile, "static");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, imageUrl), HttpStatus.OK);
//    }
//
//    /**
//     * 기본 Response 형식 DTO
//     *
//     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
//     * @param data    반환할 데이터
//     * @return ResponseEntity의 Body
//     */
//    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
//        return BasicResponse.<T>builder()
//                .message(message)
//                .data(data)
//                .build();
//    }
//}
