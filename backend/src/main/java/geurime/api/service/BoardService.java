package geurime.api.service;

import geurime.database.entity.Board;
import geurime.database.enums.BoardType;

import java.util.List;

public interface BoardService {
    List<Board.BoardTitleResponse> readAllTitle();
    Board.BoardInfoResponse readBoardDetail(Long boardId);
    List<Board.BoardTitleResponse> readTitleByCategory(BoardType boardType);
    List<Board.BoardTitleResponse> readTitleBySearch(String keyword);
    Long createBoard(Board.BoardPostRequest boardPostRequest);
    Long updateBoard(Board.BoardPutRequest boardPutRequest);
    void deleteBoard(Long boardId);
}
