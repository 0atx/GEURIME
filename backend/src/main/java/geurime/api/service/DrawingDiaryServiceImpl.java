package geurime.api.service;

import geurime.api.service.inferface.DrawingDiaryService;
import geurime.config.s3.S3Uploader;
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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingDiaryServiceImpl implements DrawingDiaryService {

    private final DrawingRepository drawingRepository;
    private final DrawingBoxRepository drawingBoxRepository;
    private final KidRepository kidRepository;
    private final S3Uploader s3Uploader;
    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    /**
     * 그림일기 상세조회
     * @param drawingId 그림일기 id
     * @return
     */
    @Override
    public Drawing.DrawingDiaryInfoResponse readDrawingDiary(Long drawingId) {
        Drawing drawing = getDrawing(drawingId);
        Drawing.DrawingDiaryInfoResponse response = modelMapper.map(drawing, Drawing.DrawingDiaryInfoResponse.class);
        response.setDrawingId(drawing.getId());

        return response;
    }

    /**
     * 아이의 그림일기 모두 조회
     * @param kidId
     * @return
     */
    @Override
    public List<Drawing.DrawingDiaryListResponse> readAllDrawingDiaryList(Long kidId) {
        Kid kid = getKid(kidId);
        List<Drawing> drawingDiaryList = drawingRepository.findByDrawingBox_KidAndDrawingBox_DrawingBoxCategoryOrderByCreateTimeDescIdDesc(kid, BoxType.일기);
        List<Drawing.DrawingDiaryListResponse> responseList = new ArrayList<>(drawingDiaryList.size());
        for (Drawing drawing : drawingDiaryList){
            Drawing.DrawingDiaryListResponse response = Drawing.DrawingDiaryListResponse.builder()
                    .drawingId(drawing.getId())
                    .createTime(drawing.getCreateTime())
                    .drawingTitle(drawing.getDrawingTitle())
                    .drawingImagePath(drawing.getDrawingImagePath())
                    .build();

            responseList.add(response);
        }
        return responseList;
    }

    /**
     * 날짜로 그림일기 검색
     * @param kidId
     * @param date 검색할 날짜 (LocalDate)
     * @return
     */
    @Override
    public List<Drawing.DrawingDiaryListResponse> readByDateDrawingDiaryList(Long kidId, LocalDate date) {
        Kid kid = getKid(kidId);

        List<Drawing> drawingDiaryList = drawingRepository.findByDrawingBox_KidAndCreateTimeOrderByIdDesc(kid, date);
        List<Drawing.DrawingDiaryListResponse> responseList = new ArrayList<>(drawingDiaryList.size());

        for (Drawing diary : drawingDiaryList){
            Drawing.DrawingDiaryListResponse response = Drawing.DrawingDiaryListResponse.builder()
                    .drawingId(diary.getId())
                    .createTime(diary.getCreateTime())
                    .drawingTitle(diary.getDrawingTitle())
                    .drawingImagePath(diary.getDrawingImagePath())
                    .build();
            responseList.add(response);
        }

        return responseList;
    }


    /**
     * 제목으로 그림일기 검색
     * @param kidId
     * @param keyword
     * @return
     */
    @Override
    public List<Drawing.DrawingDiaryListResponse> readByTitleSearchDrawingDiaryList(Long kidId, String keyword) {
        Kid kid = getKid(kidId);
        List<Drawing> drawingDiaryList = null;
        if(keyword != null && !keyword.isBlank()){
            drawingDiaryList = drawingRepository.findByDrawingBox_KidAndDrawingTitleContainsAndDrawingBox_DrawingBoxCategoryOrderByIdDesc(kid, keyword, BoxType.일기);
        }else{
            drawingDiaryList = drawingRepository.findByDrawingBox_KidAndDrawingBox_DrawingBoxCategoryOrderByCreateTimeDescIdDesc(kid, BoxType.일기);
        }
        List<Drawing.DrawingDiaryListResponse> responseList = mapList(drawingDiaryList, Drawing.DrawingDiaryListResponse.class);

        return responseList;
    }

    /**
     * 그림일기 등록
     * @param request
     * @return
     */
    @Override
    public Drawing.DrawingDiaryInfoResponse createDrawingDiary(Drawing.DrawingDiaryPostRequest request, MultipartFile imageFile) {
        Kid kid = getKid(request.getKidId());
        DrawingBox drawingBox = drawingBoxRepository.findByKidAndDrawingBoxCategory(kid, BoxType.일기)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        //이미지 업로드 후 반환된 이미지경로
        String drawingImagePath = "";
        if(imageFile != null && !imageFile.isEmpty()){
            drawingImagePath = s3Uploader.uploadAndGetUrl(imageFile);
        }

        Drawing drawing = Drawing.builder()
                .drawingBox(drawingBox)
                .drawingImagePath(drawingImagePath)
                .createTime(LocalDate.parse(request.getCreateTime(), DateTimeFormatter.ISO_DATE))
                .drawingTitle(request.getDrawingTitle())
                .drawingDiary(request.getDrawingDiary())
                .drawingDiaryWeather(request.getDrawingDiaryWeather())
                .drawingDiaryFeeling(request.getDrawingDiaryFeeling())
                .drawingDiaryWakeUp(request.getDrawingDiaryWakeUp())
                .drawingDiarySleep(request.getDrawingDiarySleep())
                .isDiary(true)
                .isLike(false)
                .build();
        drawingRepository.save(drawing);

        Drawing.DrawingDiaryInfoResponse response = modelMapper.map(drawing, Drawing.DrawingDiaryInfoResponse.class);
        response.setDrawingId(drawing.getId());

        return response;
    }

    /**
     * 그림일기 수정
     * @param request
     * @param imageFile
     * @return
     */
    @Override
    public Drawing.DrawingDiaryInfoResponse updateDrawingDiary(Drawing.DrawingDiaryPutRequest request, MultipartFile imageFile) {
        Drawing drawing = getDrawing(request.getDrawingId());

        //이미지 업로드 후 반환된 이미지경로 업데이트
        if(!imageFile.isEmpty()){
            String drawingImagePath = s3Uploader.uploadAndGetUrl(imageFile);
            drawing.changeDrawingImagePath(drawingImagePath);
        }

        drawing.changeDrawingDiaryInfo(request.getDrawingTitle(), request.getDrawingDiary(),
                request.getDrawingDiaryWeather(), request.getDrawingDiaryFeeling(),
                request.getDrawingDiaryWakeUp(), request.getDrawingDiarySleep());

        Drawing.DrawingDiaryInfoResponse response = modelMapper.map(drawing, Drawing.DrawingDiaryInfoResponse.class);

        return response;
    }

    /**
     * 그림일기 삭제
     * @param drawingId
     * @return
     */
    @Override
    public Boolean deleteDrawingDiary(Long drawingId) {
        drawingRepository.deleteById(drawingId);
        return true;
    }

    private Drawing getDrawing(Long drawingId){
        return drawingRepository.findById(drawingId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
    }

    private DrawingBox getDrawingBox(Long drawingBoxId){
        return drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));
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
