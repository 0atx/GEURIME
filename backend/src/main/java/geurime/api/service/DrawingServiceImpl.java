package geurime.api.service;
/*
 @author 신지한
 @since 2022-10-20
*/
import geurime.api.dto.DrawingPostRequest;
import geurime.api.dto.DrawingPutRequest;
import geurime.api.dto.DrawingResponse;
import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import geurime.database.repository.DrawingBoxRepository;
import geurime.database.repository.DrawingRepository;
import geurime.database.repository.KidRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService{

    private final DrawingRepository drawingRepository;
    private final DrawingBoxRepository drawingBoxRepository;
    private final KidRepository kidRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    /**
     * request를 받아 이미지를 업로드하고 반환된 이미지경로를 저장한다
     * @param request 보관함id, 그림제목, 이미지경로(변경예정)
     * @return 저장된 그림의 id
     */
    @Override
    public Long createDrawing(DrawingPostRequest request){
        DrawingBox drawingBox = drawingBoxRepository.findById(request.getDrawingBoxId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        Drawing drawing = Drawing.builder()
                .drawingTitle(request.getDrawingTitle())
                .drawingBox(drawingBox)
                .isDiary(false)
                //이미지등록 s3 구현되면 추가해야함 (request 이미지경로에서 이미지파일로 변경하기)
                .drawingImagePath("https://cdn-store.leagueoflegends.co.kr/images/v2/emotes/3153.png")
                .isLike(false)
                .build();
        drawingRepository.save(drawing);

        return drawing.getId();
    }

    /**
     * 그림 기록 단건조회
     * @param drawingId 그림id
     * @return 그림DTO
     */
    @Override
    public DrawingResponse readDrawing(Long drawingId){
        Drawing drawing = drawingRepository.findById(drawingId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
        return modelMapper.map(drawing, DrawingResponse.class);
    }

    /**
     * 자녀의 전체 그림기록 보관함별로 미리보기
     * @param kidId 자녀id
     * @return 자녀의 그림 List
     */
    @Override
    public List<DrawingResponse> readKidDrawingList(Long kidId) {
        Kid kid = kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        List<Drawing> drawingList = drawingRepository.findByDrawingBox_Kid(kid);
        List<DrawingResponse> responseList = mapList(drawingList, DrawingResponse.class);
        return responseList;
    }

    /**
     * 자녀의 좋아요 그림 조회
     * @param kidId 자녀id
     * @return 자녀의 좋아요 그림 List
     */
    @Override
    public List<DrawingResponse> readLikeDrawingList(Long kidId) {
        Kid kid = kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        List<Drawing> drawingList = drawingRepository.findByDrawingBox_KidAndIsLikeTrue(kid);
        List<DrawingResponse> responseList = mapList(drawingList, DrawingResponse.class);
        return responseList;
    }

    /**
     * 보관함의 그림 조회
     * @param drawingBoxId 보관함id
     * @return 보관함의 그림 List
     */
    @Override
    public List<DrawingResponse> readDrawingBoxList(Long drawingBoxId) {
        DrawingBox drawingBox = drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));
        List<Drawing> drawingList = drawingRepository.findByDrawingBox(drawingBox);
        List<DrawingResponse> responseList = mapList(drawingList, DrawingResponse.class);
        return responseList;
    }

    /**
     * 그림의 보관함, 제목, 좋아요 수정
     * @param request 그림id, 보관함id, 그림제목, 좋아요 여부
     * @return 그림id
     */
    @Override
    public Long updateDrawing(DrawingPutRequest request){
        Drawing drawing = drawingRepository.findById(request.getDrawingId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
        DrawingBox drawingBox = drawingBoxRepository.findById(request.getDrawingBoxId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        String drawingTitle = request.getDrawingTitle() != null ? request.getDrawingTitle() : drawing.getDrawingTitle();
        Boolean isLike = request.getIsLike() != null ? request.getIsLike() : drawing.getIsLike();

        //drawing 수정
        drawing.changeDrawingInfo(drawingBox, drawingTitle, isLike);
        return drawing.getId();
    }

    /**
     * 선택된 그림들을 지정한 보관함으로 이동한다
     * @param drawingIdList 선택된 그림들의 id
     * @param drawingBoxId 이동시킬 보관함id
     */
    @Override
    public void updateDrawingLocation(List<Long> drawingIdList, Long drawingBoxId) {
        List<Drawing> drawingList = drawingRepository.findByIdIn(drawingIdList);
        DrawingBox drawingBox = drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        for(Drawing d : drawingList){
            d.changeDrawingLocation(drawingBox);
        }
    }

    /**
     * 그림 삭제
     * @param drawingId 그림 id
     */
    @Override
    public void deleteDrawing(Long drawingId) {
        drawingRepository.deleteById(drawingId);
    }

    /**
     * 그림보관함 삭제
     * @param drawingBoxId
     * @param isDelete
     */
    @Override
    public void deleteDrawingBox(Long kidId ,Long drawingBoxId, Boolean isDelete) {
        DrawingBox drawingBox = drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        //그림 기본보관함으로 이동시키기
        if(!isDelete){
            Kid kid = kidRepository.findById(kidId)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
            List<Drawing> drawingList = drawingRepository.findByDrawingBox(drawingBox);
            DrawingBox basicDrawingBox = drawingBoxRepository.findByKidAndDrawingBoxCategory(kid, BoxType.기본);

            for(Drawing drawing : drawingList){
                drawing.changeDrawingLocation(basicDrawingBox);
            }
        }
        //그림보관함 삭제
        drawingBoxRepository.delete(drawingBox);
    }

    /**
     * 엔티티 리스트를 DTO 리스트로 변환한다
     * @param source 엔티티
     * @param targetClass 변환할 DTO클래스
     * @return DTO리스트
     */
    <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source
                .stream()
                .map(element -> modelMapper.map(element, targetClass))
                .collect(Collectors.toList());
    }
}
