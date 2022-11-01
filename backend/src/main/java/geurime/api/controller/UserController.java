package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.UserServiceImpl;
import geurime.database.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Api(tags = {"유저 정보 API를 제공하는 Controller"})
public class UserController {

    final UserServiceImpl userService;

    static final String SUCCESS = "success";

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "유저 Id 정보를 받아 유저와 유저의 가족, 자녀 정보를 조회한다")
    public ResponseEntity<BasicResponse<User.UserInfoResponse>> readUserInfo(@PathVariable("userId") Long userId) {
        User.UserInfoResponse response = userService.readUserInfo(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @PostMapping(value = "/{userId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "유저 회원가입", notes = "유저와 가족이름, 자녀 정보를 받아 새로운 가족을 만들어 등록하고 가족 id를 반환한다.")
    public ResponseEntity<BasicResponse<Long>> createUserInfo(@PathVariable("userId") Long userId, @RequestPart User.UserSignUpRequest request, @RequestPart MultipartFile profileImage) {
        Long familyId = userService.createNewUser(userId, request, profileImage);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, familyId), HttpStatus.CREATED);
    }

    @PostMapping(value = "/invite-code/{userId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "초대된 유저 회원가입", notes = "유저와 가족 초대코드를 받아 등록한다")
    public ResponseEntity<BasicResponse<Long>> createInviteUserInfo(@PathVariable("userId") Long userId, @RequestPart User.UserInviteSignUpRequest request, @RequestPart MultipartFile profileImage) {
        userService.createInvitedUser(userId, request, profileImage);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userId), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{userId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "유저 회원정보 수정", notes = "유저의 정보를 수정한다")
    public ResponseEntity<BasicResponse<Long>> updateUserInfo(@PathVariable("userId") Long userId, @RequestPart User.UserInfoUpdateRequest request, @RequestPart MultipartFile profileImage) {
        userService.updateUserInfo(userId, request, profileImage);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userId), HttpStatus.CREATED);
    }

    @DeleteMapping("/{userId}")
    @ApiOperation(value = "유저 회원탈퇴", notes = "유저id를 받아 회원탈퇴를 진행한다")
    public ResponseEntity<BasicResponse<Long>> deleteUserInfo(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userId), HttpStatus.CREATED);
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
