package geurime.api.service;

import geurime.database.entity.Board;
import geurime.database.entity.BoardImage;
import geurime.database.entity.Comment;
import geurime.database.entity.User;
import geurime.database.enums.BoardType;
import geurime.database.enums.BoxType;
import geurime.database.repository.BoardImageRepository;
import geurime.database.repository.BoardRepository;
import geurime.database.repository.CommentRepository;
import geurime.database.repository.UserRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final BoardImageRepository boardImageRepository;
    private final UserRepository userRepository;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    /**
     * page와 size를 받아 게시글 리스트를 boardId로 정렬하여 반환한다.
     * @param page 몇 번째 페이지인지 표시
     * @param size 한번에 볼 게시글 수
     * @return
     */
    @Override
    public List<Board.BoardTitleResponse> readAllTitle(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        Slice<Board> boardSlice = boardRepository.findAllJPQLFetch(pageRequest);

        List<Board.BoardTitleResponse> responseList = new ArrayList<>(size);
        for (Board board : boardSlice){
            Board.BoardTitleResponse response = modelMapper.map(board, Board.BoardTitleResponse.class);

            Optional<BoardImage> boardFirstImage = boardImageRepository.findFirstByBoard(board);
            if(boardFirstImage.isPresent()){
                response.setBoardFirstImage(boardFirstImage.get().getBoardImagePath());
            }

            Long commentCount = commentRepository.countByBoard(board);
            response.setCommentCount(commentCount.intValue());

            responseList.add(response);
        }

        return responseList;
    }

    /**
     * 게시글의 상세정보(게시글 정보, 작성자 정보, 댓글 List, 이미지 List)를 반환한다.
     * @param boardId 게시글 id
     * @return
     */
    @Override
    public Board.BoardInfoResponse readBoardDetail(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.BOARD_NOT_FOUND_ERROR));
        //조회수 증가
        board.increaseBoardViews();
        Board.BoardInfoResponse boardInfoResponse = modelMapper.map(board, Board.BoardInfoResponse.class);

        //작성자
        User user = board.getUser();
        boardInfoResponse.setWriterId(user.getId());
        boardInfoResponse.setWriterProfile(user.getUserProfileImage());
        boardInfoResponse.setWriterNickname(user.getNickname());

        //이미지
        List<BoardImage> boardImageList = board.getBoardImageList();
        List<String> stringImageList = new ArrayList<>(boardImageList.size());
        for (BoardImage boardImage : boardImageList){
            stringImageList.add(boardImage.getBoardImagePath());
        }
        boardInfoResponse.setBoardImagePathList(stringImageList);

        //댓글
        List<Comment> commentList = board.getCommentList();
        List<Board.BoardCommentDto> boardCommentDtoList = mapList(commentList, Board.BoardCommentDto.class);
        boardInfoResponse.setBoardCommentDtoList(boardCommentDtoList);

        return boardInfoResponse;
    }

    /**
     * 게시글 카테고리, page와 size를 받아 게시글 리스트를 boardId로 정렬하여 반환한다.
     * @param page 몇 번째 페이지인지 표시
     * @param size 한번에 볼 게시글 수
     * @param stringBoardType 검색할 카테고리
     * @return
     */
    @Override
    public List<Board.BoardTitleResponse> readTitleByCategory(Integer page, Integer size, String stringBoardType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        BoardType boardType = checkBoardType(stringBoardType);

        Slice<Board> boardSlice = boardRepository.findByBoardCategory(boardType ,pageRequest);

        List<Board.BoardTitleResponse> responseList = new ArrayList<>(size);
        for (Board board : boardSlice){
            Board.BoardTitleResponse response = modelMapper.map(board, Board.BoardTitleResponse.class);

            Optional<BoardImage> boardFirstImage = boardImageRepository.findFirstByBoard(board);
            if(boardFirstImage.isPresent()){
                response.setBoardFirstImage(boardFirstImage.get().getBoardImagePath());
            }

            Long commentCount = commentRepository.countByBoard(board);
            response.setCommentCount(commentCount.intValue());

            responseList.add(response);
        }

        return responseList;
    }

    /**
     * 게시글 카테고리, 검색어를 포함하는 제목의 게시글을 page와 size를 받아 게시글 리스트를 boardId로 정렬하여 반환한다.
     * @param page 몇 번째 페이지인지 표시
     * @param size 한번에 볼 게시글 수
     * @param stringBoardType 게시글 카테고리
     * @param keyword 검색어
     * @return
     */
    @Override
    public List<Board.BoardTitleResponse> readTitleBySearch(Integer page, Integer size, String stringBoardType, String keyword) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        BoardType boardType = checkBoardType(stringBoardType);

        Slice<Board> boardSlice = boardRepository.findByBoardCategoryAndBoardTitleContains(boardType , keyword, pageRequest);

        List<Board.BoardTitleResponse> responseList = new ArrayList<>(size);
        for (Board board : boardSlice){
            Board.BoardTitleResponse response = modelMapper.map(board, Board.BoardTitleResponse.class);

            Optional<BoardImage> boardFirstImage = boardImageRepository.findFirstByBoard(board);
            if(boardFirstImage.isPresent()){
                response.setBoardFirstImage(boardFirstImage.get().getBoardImagePath());
            }

            Long commentCount = commentRepository.countByBoard(board);
            response.setCommentCount(commentCount.intValue());

            responseList.add(response);
        }

        return responseList;
    }

    /**
     * 게시글 생성 method
     * @param request
     * @return 생성된 게시글의 id
     */
    @Override
    public Long createBoard(Board.BoardPostRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        //enum 유효성 검사
        BoardType boardType = checkBoardType(request.getBoardCategory());

        Board board = Board.builder()
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .boardTitle(request.getBoardTitle())
                .boardContent(request.getBoardContent())
                .boardCategory(boardType)
                .boardViews(0)
                .user(user)
                .build();

        boardRepository.save(board);

        List<BoardImage> boardImageList = new ArrayList<>();

        for(String imagePath : request.getBoardImagePathList()){
            BoardImage boardImage = BoardImage.builder()
                    .boardImagePath(imagePath)
                    .board(board)
                    .build();

            boardImageList.add(boardImage);
        }
        boardImageRepository.saveAll(boardImageList);

        return board.getId();
    }

    /**
     * 입력받은 문자열을 enum으로 변환한다.
     * 유효하지 않은 문자열은 에러를 발생시킨다
     * @param stringBoardType 게시판 분류(string)
     * @return 게시판 분류(enum)
     */
    private BoardType checkBoardType(String stringBoardType){
        BoardType boardType = null;
        try {
            boardType = BoardType.valueOf(stringBoardType);
        }catch (IllegalArgumentException e){
            throw new CustomException(CustomExceptionList.BOARD_TYPE_NOT_FOUND_ERROR);
        }
        return boardType;
    }

    /**
     * 유저 id와 수정정보를 받아 작성자인 경우에 수정하고 아니면 0을 반환한다
     * @param userId 수정을 시도하는 유저 id
     * @param request 게시글을 수정할 정보
     * @return 게시글 id
     */
    @Override
    public Long updateBoard(Long userId, Board.BoardPutRequest request) {
        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.BOARD_NOT_FOUND_ERROR));
        if(board.getUser().getId() == userId){
            board.updateBoard(request);
            return board.getId();
        }else{
            return 0L;
        }
    }

    /**
     * 게시글 삭제 method
     * @param userId 삭제를 시도하는 유저 id
     * @param boardId 게시글 id
     * @return 삭제되면 true를, 미삭제는 false를 반환한다
     */
    @Override
    public Boolean deleteBoard(Long userId, Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.BOARD_NOT_FOUND_ERROR));

        // 게시글 작성자와 일치하면 게시글 삭제
        if(board.getUser().getId() == userId){
            boardRepository.deleteById(boardId);
            return true;
        }else{
            return false;
        }

    }

    /**
     * 엔티티와 DTO List 변환 메서드
     * @param source 원본
     * @param targetClass 변환시킬 대상 class
     * @param <S>
     * @param <T>
     * @return
     */
    <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source
                .stream()
                .map(element -> modelMapper.map(element, targetClass))
                .collect(Collectors.toList());
    }
}
