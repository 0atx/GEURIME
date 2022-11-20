package geurime.api.service;

import geurime.api.service.inferface.DrawingService;
import geurime.config.s3.S3Uploader;
import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import geurime.database.repository.DrawingBoxRepository;
import geurime.api.dto.CountHeatMapResponse;
import geurime.database.repository.DrawingRepository;
import geurime.database.repository.KidRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService {

    private final DrawingRepository drawingRepository;
    private final DrawingBoxRepository drawingBoxRepository;
    private final KidRepository kidRepository;
    private final S3Uploader s3Uploader;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    // AI 분석 결과값 넣어주는 메서드 필요

    /**
     * 그림기록 상세조회
     * @param drawingId
     * @return
     */
    @Override
    public Drawing.DrawingInfoResponse readDrawingInfo(Long drawingId) {
        Drawing drawing = getDrawing(drawingId);
        Drawing.DrawingInfoResponse response = modelMapper.map(drawing, Drawing.DrawingInfoResponse.class);
        response.setDrawingId(drawing.getId());

        return response;
    }

    /**
     * 좋아요 그림리스트 조회
     * @param kidId
     * @return
     */
    @Override
    public List<Drawing.DrawingGalleryDto> readLikeDrawingList(Long kidId) {
        Kid kid = getKid(kidId);
        List<Drawing> drawingList = drawingRepository.findByDrawingBox_KidAndIsLikeTrueOrderByIdDesc(kid);
        List<Drawing.DrawingGalleryDto> responseList = new ArrayList<>(drawingList.size());
        for (Drawing drawing : drawingList){
            Drawing.DrawingGalleryDto response = Drawing.DrawingGalleryDto.builder()
                    .drawingId(drawing.getId())
                    .drawingImagePath(drawing.getDrawingImagePath())
                    .build();
            responseList.add(response);
        }
        
        return responseList;
    }

    /**
     * 그림보관함의 그림리스트 조회
     * @param drawingBoxId
     * @return
     */
    @Override
    public Drawing.DrawingGalleryResponse readBoxDrawingList(Long kidId, Long drawingBoxId) {
        DrawingBox drawingBox = getDrawingBox(drawingBoxId);

        Drawing.DrawingGalleryResponse response = new Drawing.DrawingGalleryResponse();
        response.setDrawingBoxName(drawingBox.getDrawingBoxName());

        //조회하는 자녀의 아이디가 일치하면
        if(drawingBox.getKid().getId().equals(kidId)){
            List<Drawing> drawingList = drawingBox.getDrawingList();
            List<Drawing.DrawingGalleryDto> dtoList = new ArrayList<>(drawingList.size());

            //DTO에 매핑 - id역순 (최신순으로)
            for (int i = drawingList.size() - 1; i >= 0; i--) {
                Drawing drawing = drawingList.get(i);
                Drawing.DrawingGalleryDto dto = new Drawing.DrawingGalleryDto();
                dto.setDrawingId(drawing.getId());
                dto.setDrawingImagePath(drawing.getDrawingImagePath());

                dtoList.add(dto);
            }

            response.setDtoList(dtoList);

            return response;
        }

        //불일치하면 null 반환
        return null;
    }

    /**
     * 이미지를 서버에 업로드 후 반환된 경로를 엔티티에 저장한다
     * @param request
     * @param imageFile
     * @return
     */
    @Override
    public Drawing.DrawingInfoResponse createDrawing(Drawing.DrawingPostRequest request, MultipartFile imageFile) {

        //이미지 업로드 후 반환된 이미지경로
        String drawingImagePath = "";
        if(imageFile != null && !imageFile.isEmpty()){
            drawingImagePath = s3Uploader.uploadAndGetUrl(imageFile);
        }

        DrawingBox drawingBox = getDrawingBox(request.getDrawingBoxId());

        Drawing drawing = Drawing.builder()
                .drawingBox(drawingBox)
                .drawingTitle(request.getDrawingTitle())
                .drawingImagePath(drawingImagePath)
                .createTime(LocalDate.now())
                .isDiary(false)
                .isLike(false)
                .build();
        drawingRepository.save(drawing);

        Drawing.DrawingInfoResponse response = modelMapper.map(drawing, Drawing.DrawingInfoResponse.class);
        response.setDrawingId(drawing.getId());

        return response;
    }

    /**
     * 그림의 제목과 보관함을 수정한다. 수정요청하는 자녀의 id가 불일치하면 0을 반환한다.
     * @param request
     * @return
     */
    @Override
    public Long updateDrawing(Drawing.DrawingPutRequest request) {
        Drawing drawing = getDrawing(request.getDrawingId());
        DrawingBox drawingBox = getDrawingBox(request.getDrawingBoxId());

        if(drawingBox.getKid().getId().equals(request.getKidId())){
            drawing.changeDrawingInfo(drawingBox, request.getDrawingTitle(), request.getIsLike());
            return drawing.getId();
        }

        return 0L;
    }

    /**
     * 리스트로 담긴 그림들을 지정된 그림보관함으로 모두 이동한다.
     * @param request
     * @return 이동된 그림보관함의 id
     */
    @Override
    public Long drawingBoxMigration(Drawing.DrawingMigrationPutRequest request) {
        DrawingBox drawingBox = getDrawingBox(request.getDrawingBoxId());

        for (Long drawingId : request.getDrawingIdList()){
            Drawing drawing = getDrawing(drawingId);
            drawing.migrationDrawing(drawingBox);
        }

        return drawingBox.getId();
    }

    /**
     * 그림보관함을 삭제. isDelete가 true이면 사진도 전부 삭제, false이면 기본보관함으로 이동
     * @param drawingBoxId
     * @param isDelete
     */
    @Override
    public Boolean deleteDrawingBox(Long kidId, Long drawingBoxId, Boolean isDelete) {
        DrawingBox deleteDrawingBox = getDrawingBox(drawingBoxId);
        Kid kid = getKid(kidId);

        //커스텀 보관함이 아니거나
        //삭제하려는 자녀가 보관함의 주인이 아니면 false 반환
        if(deleteDrawingBox.getDrawingBoxCategory() != BoxType.CUSTOM || !deleteDrawingBox.getKid().getId().equals(kid.getId())){
            return false;
        }

        //삭제할 보관함의 사진들을 기본보관함으로 이동
        if(!isDelete){
            DrawingBox basicDrawingBox = drawingBoxRepository.findByKidAndDrawingBoxCategory(kid, BoxType.BASIC)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));
            for (Drawing drawing : deleteDrawingBox.getDrawingList()){
                drawing.migrationDrawing(basicDrawingBox);
            }
            deleteDrawingBox.emptyAllDrawings();
        }

        drawingBoxRepository.delete(deleteDrawingBox);
        return true;
    }

    /**
     * 삭제하려는 자녀의 id가 그림기록 주인의 id와 일치하는 경우 삭제하고 true를 반환한다.
     * @param kidId 삭제를 시도하는 자녀 id
     * @param drawingId 삭제할 그림 id
     */
    @Override
    public Boolean deleteDrawing(Long kidId, Long drawingId) {
        Drawing drawing = getDrawing(drawingId);

        if(drawing.getDrawingBox().getKid().getId().equals(kidId)){
            drawingRepository.delete(drawing);
            return true;
        }
        return false;
    }

    @Override
    public List<CountHeatMapResponse> readDrawingCountHeatMap(Long kidId) {
        Kid kid = getKid(kidId);

        List<CountHeatMapResponse> countHeatMapResponseList =  drawingRepository.findDrawingCountList(kid);

        return countHeatMapResponseList;

    }

    private DrawingBox getDrawingBox(Long drawingBoxId){
        return drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));
    }

    private Drawing getDrawing(Long drawingId){
        return drawingRepository.findById(drawingId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
    }

    private Kid getKid(Long kidId){
        return kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
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
