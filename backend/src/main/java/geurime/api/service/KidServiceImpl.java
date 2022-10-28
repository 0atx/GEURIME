package geurime.api.service;

import geurime.database.entity.DrawingBox;
import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import geurime.database.repository.DrawingBoxRepository;
import geurime.database.repository.FamilyRepository;
import geurime.database.repository.KidRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class KidServiceImpl implements KidService{
    private final KidRepository kidRepository;
    private final FamilyRepository familyRepository;
    private final DrawingBoxRepository drawingBoxRepository;

    // DTO와 엔티티 변환
    ModelMapper modelMapper = new ModelMapper();

    /**
     * 자녀정보 조회
     * @param kidId
     * @return
     */
    @Override
    public Kid.KidInfoResponse readKidInfo(Long kidId) {
        Kid kid = kidRepository.findByIdWithDrawingBox(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        Kid.KidInfoResponse response = modelMapper.map(kid, Kid.KidInfoResponse.class);

        List<DrawingBox> drawingBoxList = kid.getDrawingBoxList();

        List<Kid.DrawingBoxDto> drawingBoxDtoList = mapList(drawingBoxList, Kid.DrawingBoxDto.class);
        response.setDrawingBoxDtoList(drawingBoxDtoList);
        
        return response;
    }

    /**
     * 자녀를 등록하고 기본,그림일기 보관함을 생성한다.
     * @param request
     * @return 자녀 id
     */
    @Override
    public Long createKid(Kid.KidPostRequest request) {
        Family family = familyRepository.findById(request.getFamilyId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.FAMILY_NOT_FOUND_ERROR));

        Kid kid = Kid.builder()
                .family(family)
                .kidName(request.getKidName())
                .kidProfileImage(request.getKidProfileImage())
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

        return kid.getId();
    }

    /**
     * 자녀정보 수정
     * @param request
     * @return
     */
    @Override
    public Long updateKid(Kid.KidPutRequest request) {
        Kid kid = kidRepository.findById(request.getKidId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));
        kid.updateKidInfo(request);

        return kid.getId();
    }

    /**
     * 자녀정보 삭제
     * @param kidId
     */
    @Override
    public void deleteKid(Long kidId) {
        kidRepository.deleteById(kidId);
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
