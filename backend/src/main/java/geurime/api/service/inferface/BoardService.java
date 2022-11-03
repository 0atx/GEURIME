package geurime.api.service.inferface;

import geurime.database.entity.Board;
import geurime.database.enums.BoardType;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    List<Board.BoardTitleResponse> readAllTitle(Integer page, Integer size);
    Board.BoardInfoResponse readBoardDetail(Long boardId);
    List<Board.BoardTitleResponse> readTitleByCategory(Integer page, Integer size, String stringBoardType);
    List<Board.BoardTitleResponse> readTitleBySearch(Integer page, Integer size, String stringBoardType, String keyword);
    Board.BoardInfoResponse createBoard(Board.BoardPostRequest request, MultipartFile imageFile);
    Board.BoardInfoResponse updateBoard(Board.BoardPutRequest request, MultipartFile imageFile);
    Boolean deleteBoard(Long userId, Long boardId);
}
