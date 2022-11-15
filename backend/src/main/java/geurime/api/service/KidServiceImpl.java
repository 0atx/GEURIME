package geurime.api.service;

import geurime.api.dto.EmotionDto;
import geurime.api.service.inferface.KidService;
import geurime.config.s3.S3Uploader;
import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import geurime.database.repository.DrawingBoxRepository;
import geurime.database.repository.DrawingRepository;
import geurime.database.repository.FamilyRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class KidServiceImpl implements KidService {
    private final KidRepository kidRepository;
    private final FamilyRepository familyRepository;
    private final DrawingBoxRepository drawingBoxRepository;
    private final DrawingRepository drawingRepository;
    private final S3Uploader s3Uploader;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    /**
     * 자녀정보 조회
     * @param kidId
     * @return
     */
    @Override
    public Kid.KidMainInfoResponse readKidInfo(Long kidId) {
        Kid kid = kidRepository.findByIdWithDrawingBox(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        Kid.KidMainInfoResponse response = modelMapper.map(kid, Kid.KidMainInfoResponse.class);

        List<DrawingBox> drawingBoxList = kid.getDrawingBoxList();
        List<Kid.DrawingBoxDto> drawingBoxDtoList = new ArrayList<>(drawingBoxList.size());

        for (DrawingBox drawingBox : drawingBoxList){
            Optional<Drawing> firstDrawing = drawingRepository.findFirstByDrawingBoxOrderByIdDesc(drawingBox);
            String thumbnailImage = firstDrawing.isPresent() ? firstDrawing.get().getDrawingImagePath() : null;
            long drawingCount = drawingRepository.countByDrawingBox(drawingBox);

            Kid.DrawingBoxDto drawingBoxDto = Kid.DrawingBoxDto.builder()
                    .drawingBoxId(drawingBox.getId())
                    .drawingBoxName(drawingBox.getDrawingBoxName())
                    .drawingBoxCategory(drawingBox.getDrawingBoxCategory().toString())
                    .thumbnailImage(thumbnailImage)
                    .drawingCount(drawingCount)
                    .build();
            drawingBoxDtoList.add(drawingBoxDto);
        }

        response.setDrawingBoxDtoList(drawingBoxDtoList);

        List<Drawing> sampleDrawingList = drawingRepository.findTop4ByDrawingBox_KidOrderByIdDesc(kid);
        List<String> sampleImageList = new ArrayList<>();
        for (Drawing sample : sampleDrawingList){
            sampleImageList.add(sample.getDrawingImagePath());
        }
        response.setSampleImageList(sampleImageList);

        return response;
    }

    /**
     * 자녀를 등록하고 기본,그림일기 보관함을 생성한다.
     * @param request
     * @return 자녀 id
     */
    @Override
    public Kid.KidInfoResponse createKid(Kid.KidPostRequest request, MultipartFile profileImage) {
        Family family = familyRepository.findById(request.getFamilyId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.FAMILY_NOT_FOUND_ERROR));

        String kidProfileImage = "";
        //이미지 업로드 후 반환된 이미지경로 db에 저장
        if(profileImage != null && !profileImage.isEmpty()){
            kidProfileImage = s3Uploader.uploadAndGetUrl(profileImage);
        }

        Kid kid = Kid.builder()
                .family(family)
                .kidName(request.getKidName())
                .kidProfileImage(kidProfileImage)
                .kidBirth(LocalDate.parse(request.getKidBirth(), DateTimeFormatter.ISO_DATE))
                .build();
        kidRepository.save(kid);

        DrawingBox basicDrawingBox = DrawingBox.builder()
                .kid(kid)
                .drawingBoxName("기본 보관함")
                .drawingBoxCategory(BoxType.기본)
                .build();
        DrawingBox diaryDrawingBox = DrawingBox.builder()
                .kid(kid)
                .drawingBoxName("그림일기 보관함")
                .drawingBoxCategory(BoxType.일기)
                .build();
        drawingBoxRepository.save(basicDrawingBox);
        drawingBoxRepository.save(diaryDrawingBox);

        Kid.KidInfoResponse response = modelMapper.map(kid, Kid.KidInfoResponse.class);

        return response;
    }

    /**
     * 자녀정보 수정
     * @param request
     * @return
     */
    @Override
    public Kid.KidInfoResponse updateKid(Kid.KidPutRequest request, MultipartFile profileImage) {
        Kid kid = kidRepository.findById(request.getKidId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        kid.updateKidInfo(request);

        //이미지 업로드 후 반환된 이미지경로 db에 저장
        if(profileImage != null && !profileImage.isEmpty()){
            String kidProfileImage = s3Uploader.uploadAndGetUrl(profileImage);
            kid.updateProfile(kidProfileImage);
        }

        Kid.KidInfoResponse response = modelMapper.map(kid, Kid.KidInfoResponse.class);

        return response;
    }

    /**
     * 자녀정보 삭제
     * @param kidId
     */
    @Override
    public void deleteKid(Long kidId) {
        kidRepository.deleteById(kidId);
    }

    public EmotionDto readEmotionCount(Long kidId, LocalDate date){
        Kid kid = kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));

        LocalDate startDate = date.minusDays(1);
        LocalDate endDate = date.plusMonths(1);

        long happy = kidRepository.countHappy(kid.getId(), startDate, endDate);
        long sad = kidRepository.countSad(kid.getId(), startDate, endDate);
        long angry = kidRepository.countAngry(kid.getId(), startDate, endDate);

        return EmotionDto.builder()
                .happy(happy)
                .sad(sad)
                .angry(angry)
                .build();
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
