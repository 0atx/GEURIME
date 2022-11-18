package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.CommentServiceImpl;
import geurime.database.entity.Comment;
import geurime.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
@Api(tags = {"댓글 API를 제공하는 Controller"})
public class CommentController {

    final CommentServiceImpl commentService;
    static final String SUCCESS = "success";

    @GetMapping("/{boardId}")
    @ApiOperation(value = "게시글 댓글 조회", notes = "게시글의 댓글을 조회한다")
    public ResponseEntity<BasicResponse<List<Comment.CommentResponse>>> readComment(@PathVariable Long boardId) {
        try {
            List<Comment.CommentResponse> responseList = commentService.readComment(boardId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    @ApiOperation(value = "댓글 등록", notes = "등록 정보를 받아 댓글을 등록한다")
    public ResponseEntity<BasicResponse<Comment.CommentResponse>> createComment(@RequestBody Comment.CommentPostRequest request) {
        try {
            Comment.CommentResponse response = commentService.createComment(request);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{commentId}")
    @ApiOperation(value = "댓글 수정", notes = "수정 정보를 받아 댓글을 수정한다. 수정을 시도하는 유저(userId)가 작성자와 일치하지 않으면 0을 반환한다.")
    public ResponseEntity<BasicResponse<Comment.CommentResponse>> updateComment(@PathVariable Long commentId, @RequestBody Comment.CommentPutRequest request) {
        try {
            Comment.CommentResponse response = commentService.updateComment(request);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(makeBasicResponse(e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{commentId}")
    @ApiOperation(value = "댓글 삭제", notes = "댓글 id를 받아 댓글을 삭제한다. 삭제을 시도하는 유저(userId)가 작성자와 일치하지 않으면 false를 반환한다.")
    public ResponseEntity<BasicResponse<Boolean>> updateComment(@PathVariable Long commentId, @RequestParam Long userId) {
        try {
            Boolean isDelete = commentService.deleteComment(userId, commentId);
            return new ResponseEntity<>(makeBasicResponse(SUCCESS, isDelete), HttpStatus.CREATED);
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
