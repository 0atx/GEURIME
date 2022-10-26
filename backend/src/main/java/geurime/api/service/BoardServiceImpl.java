package geurime.api.service;

import geurime.database.entity.Board;
import geurime.database.entity.User;
import geurime.database.enums.BoardType;
import geurime.database.repository.BoardImageRepository;
import geurime.database.repository.BoardRepository;
import geurime.database.repository.CommentRepository;
import geurime.database.repository.UserRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final BoardImageRepository boardImageRepository;
    private final UserRepository userRepository;

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
    public Long createBoard(Board.BoardPostRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        

        Board board = Board.builder()
                .createTime(LocalDateTime.now())
                .boardTitle(request.getBoardTitle())
                .boardContent(request.getBoardContent())
                .boardCategory(BoardType.valueOf(request.getBoardCategory()))
                .boardViews(0)
                .user(user)
                .build();

        return null;
    }

    @Override
    public Long updateBoard(Board.BoardPutRequest request) {
        return null;
    }

    @Override
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
