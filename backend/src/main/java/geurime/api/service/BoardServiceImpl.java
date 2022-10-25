package geurime.api.service;

import geurime.database.entity.Board;
import geurime.database.enums.BoardType;
import geurime.database.repository.BoardImageRepository;
import geurime.database.repository.BoardRepository;
import geurime.database.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final BoardImageRepository boardImageRepository;

    @Override
    public List<Board.BoardTitleResponse> readAllTitle() {
        return null;
    }

    @Override
    public Board.BoardInfoResponse readBoardDetail(Long boardId) {
        return null;
    }

    @Override
    public List<Board.BoardTitleResponse> readTitleByCategory(BoardType boardType) {
        return null;
    }

    @Override
    public List<Board.BoardTitleResponse> readTitleBySearch(String keyword) {
        return null;
    }

    @Override
    public Long createBoard(Board.BoardPostRequest boardPostRequest) {
        return null;
    }

    @Override
    public Long updateBoard(Board.BoardPutRequest boardPutRequest) {
        return null;
    }

    @Override
    public void deleteBoard(Long boardId) {

    }
}
