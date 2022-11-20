package geurime.api.service;

import geurime.api.service.inferface.BoardService;
import geurime.config.s3.S3Uploader;
import geurime.database.entity.Board;
import geurime.database.entity.Comment;
import geurime.database.entity.User;
import geurime.database.enums.BoardType;
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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

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
        Optional<User> userOptional = userRepository.findById(board.getUser().getId());
        if(userOptional.isPresent()){
            User user = userOptional.get();
            boardInfoResponse.setWriterId(user.getId());
            boardInfoResponse.setWriterProfile(user.getUserProfileImage());
            boardInfoResponse.setWriterNickname(user.getNickname());
        }else{
            boardInfoResponse.setWriterId(0L);
            boardInfoResponse.setWriterNickname("탈퇴한 회원");
        }

        //댓글
        List<Comment> commentList = commentRepository.findByBoard(board);

        List<Board.BoardCommentDto> boardCommentDtoList = new ArrayList<>(commentList.size());
        String ghostUser = "탈퇴한 회원";

        for (Comment comment : commentList){
            Optional<User> commentUser = userRepository.findById(comment.getCommentUserId());

            if(commentUser.isPresent()){
                Board.BoardCommentDto commentDto = Board.BoardCommentDto.builder()
                        .commentId(comment.getId())
                        .commentUserId(comment.getCommentUserId())
                        .commentUserProfile(commentUser.get().getUserProfileImage())
                        .commentUserNickname(commentUser.get().getNickname())
                        .createTime(comment.getCreateTime())
                        .updateTime(comment.getUpdateTime())
                        .commentContent(comment.getCommentContent())
                        .build();
                boardCommentDtoList.add(commentDto);
            }else{
                Board.BoardCommentDto commentDto = Board.BoardCommentDto.builder()
                        .commentId(comment.getId())
                        .commentUserId(comment.getCommentUserId())
                        .commentUserNickname(ghostUser)
                        .createTime(comment.getCreateTime())
                        .updateTime(comment.getUpdateTime())
                        .commentContent(comment.getCommentContent())
                        .build();
                boardCommentDtoList.add(commentDto);
            }


        }
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

        Slice<Board> boardSlice = null;

        // 전체인 경우에는 모두 조회
        if(boardType == BoardType.전체){
            boardSlice = boardRepository.findAllJPQLFetch(pageRequest);
        }else{
            boardSlice = boardRepository.findByBoardCategory(boardType ,pageRequest);
        }

        List<Board.BoardTitleResponse> responseList = new ArrayList<>(size);
        for (Board board : boardSlice){
            Board.BoardTitleResponse response = modelMapper.map(board, Board.BoardTitleResponse.class);

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

        Slice<Board> boardSlice = null;

        // 전체인 경우에는 모두 조회
        if(boardType == BoardType.전체){
            if(keyword != null && !keyword.equals("")){
                //키워드 있는 경우
                boardSlice = boardRepository.findByBoardTitleContains(keyword, pageRequest);
            }else{
                //키워드 없는 경우
                boardSlice = boardRepository.findAll(pageRequest);
            }
        }
        // 분류 조회
        else{
            if(keyword != null && !keyword.equals("")){
                //키워드 있는 경우
                boardSlice = boardRepository.findByBoardCategoryAndBoardTitleContains(boardType, keyword, pageRequest);
            }else{
                //키워드 없는 경우
                boardSlice = boardRepository.findByBoardCategory(boardType, pageRequest);
            }
        }

        List<Board.BoardTitleResponse> responseList = new ArrayList<>(size);
        for (Board board : boardSlice){
            Board.BoardTitleResponse response = modelMapper.map(board, Board.BoardTitleResponse.class);

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
    public Board.BoardInfoResponse createBoard(Board.BoardPostRequest request, MultipartFile imageFile) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        //enum 유효성 검사
        BoardType boardType = checkBoardType(request.getBoardCategory());
        
        if(boardType == BoardType.전체){
            boardType = BoardType.자유;
        }

        String imagePath = null;

        //이미지가 있는 경우
        if(imageFile != null && !imageFile.isEmpty()){
            imagePath = s3Uploader.uploadAndGetUrl(imageFile);
        }

        Board board = Board.builder()
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .boardTitle(request.getBoardTitle())
                .boardContent(request.getBoardContent())
                .boardCategory(boardType)
                .boardImagePath(imagePath)
                .boardViews(0)
                .user(user)
                .build();

        boardRepository.save(board);

        Board.BoardInfoResponse response = modelMapper.map(board, Board.BoardInfoResponse.class);

        //작성자
        response.setWriterId(user.getId());
        response.setWriterProfile(user.getUserProfileImage());
        response.setWriterNickname(user.getNickname());

        return response;
    }



    @Override
    public Board.BoardInfoResponse updateBoard(Board.BoardPutRequest request, MultipartFile imageFile) {
        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.BOARD_NOT_FOUND_ERROR));
        board.updateBoard(request);

        //이미지가 있는 경우 교체
        if(imageFile != null && !imageFile.isEmpty()){
            String imagePath = s3Uploader.uploadAndGetUrl(imageFile);
            board.changeBoardImage(imagePath);
        }

        Board.BoardInfoResponse response = modelMapper.map(board, Board.BoardInfoResponse.class);

        User writer = board.getUser();

        response.setWriterId(writer.getId());
        response.setWriterProfile(writer.getUserProfileImage());
        response.setWriterNickname(writer.getNickname());

        return response;
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
        if(board.getUser().getId().equals(userId)){
            boardRepository.deleteById(boardId);
            return true;
        }else{
            return false;
        }

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
            if("전체".equals(stringBoardType)) {
                boardType = BoardType.valueOf("전체");
            } else if("자유".equals(stringBoardType)) {
                boardType = BoardType.valueOf("자유");
            } else if("질문".equals(stringBoardType)) {
                boardType = BoardType.valueOf("질문");
            } else if("정보".equals(stringBoardType)) {
                boardType = BoardType.valueOf("정보");
            } else {
                boardType = BoardType.valueOf(stringBoardType);
            }
        }catch (IllegalArgumentException e){
            throw new CustomException(CustomExceptionList.BOARD_TYPE_NOT_FOUND_ERROR);
        }
        return boardType;
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
