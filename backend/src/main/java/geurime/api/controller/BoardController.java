package geurime.api.controller;

import geurime.api.dto.common.BasicResponse;
import geurime.api.service.BoardServiceImpl;
import geurime.database.entity.Board;
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
@RequestMapping("/boards")
@Api(tags = {"게시글 API를 제공하는 Controller"})
public class BoardController {
    final BoardServiceImpl boardService;

    static final String SUCCESS = "success";

    @GetMapping
    @ApiOperation(value = "게시글 리스트 조회", notes = "페이지 번호 page와 한번에 받아올 사이즈 size를 받아 게시글 목록을 반환한다.")
    public ResponseEntity<BasicResponse<List<Board.BoardTitleResponse>>> readBoardTitle(@RequestParam Integer page, @RequestParam Integer size) {
        List<Board.BoardTitleResponse> responseSlice = boardService.readAllTitle(page, size);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseSlice), HttpStatus.OK);
    }

    @GetMapping("/category")
    @ApiOperation(value = "게시글 분류조회", notes = "게시글 카테고리와 페이지 번호 page와 한번에 받아올 사이즈 size를 받아 게시글 목록을 반환한다.")
    public ResponseEntity<BasicResponse<List<Board.BoardTitleResponse>>> readBoardByCategory(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String category) {
        List<Board.BoardTitleResponse> responseList = boardService.readTitleByCategory(page, size, category);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/search")
    @ApiOperation(value = "게시글 검색조회", notes = "게시글 카테고리와 검색어, 페이지 번호 page와 한번에 받아올 사이즈 size를 받아 게시글 목록을 반환한다.")
    public ResponseEntity<BasicResponse<List<Board.BoardTitleResponse>>> readBoardBySearch
            (@RequestParam Integer page, @RequestParam Integer size, @RequestParam String category, @RequestParam String keyword) {
        List<Board.BoardTitleResponse> responseList = boardService.readTitleBySearch(page, size, category, keyword);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    @ApiOperation(value = "게시글 상세조회", notes = "게시글의 조회수를 1 올리고 상세 정보를 불러온다.")
    public ResponseEntity<BasicResponse<Board.BoardInfoResponse>> readBoardDetail(@PathVariable("boardId") Long boardId) {
        Board.BoardInfoResponse response = boardService.readBoardDetail(boardId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "게시글 등록", notes = "등록 정보를 받아 게시글을 등록한다")
    public ResponseEntity<BasicResponse<Long>> createBoard(@RequestPart Board.BoardPostRequest request, @RequestPart List<MultipartFile> imageFileList) {
        Long boardId = boardService.createBoard(request, imageFileList);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, boardId), HttpStatus.CREATED);
    }

    @PutMapping
    @ApiOperation(value = "게시글 수정", notes = "수정 정보를 받아 수정하려는 유저가 작성자이면 게시글을 수정한다")
    public ResponseEntity<BasicResponse<Long>> updateBoard(@RequestParam Long userId ,@RequestBody Board.BoardPutRequest request) {
        Long boardId = boardService.updateBoard(userId, request);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, boardId), HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "게시글 삭제", notes = "삭제하고자 하는 유저의 id를 비교하고 글작성자와 일치하면 삭제 후 true를 반환한다.")
    public ResponseEntity<BasicResponse<Boolean>> deleteBoard(@RequestParam Long userId, @RequestParam Long boardId) {
        Boolean isDelete = boardService.deleteBoard(userId, boardId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, isDelete), HttpStatus.OK);
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
