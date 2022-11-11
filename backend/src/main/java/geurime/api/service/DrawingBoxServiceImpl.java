package geurime.api.service;

import geurime.api.service.inferface.DrawingBoxService;
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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingBoxServiceImpl implements DrawingBoxService {
    private final DrawingBoxRepository drawingBoxRepository;
    private final DrawingRepository drawingRepository;
    private final KidRepository kidRepository;

    /**
     * 커스텀 타입의 그림보관함을 생성한다.
     * @param kidId
     * @param drawingBoxName
     * @return
     */
    @Override
    public Kid.KidInfoResponse createDrawingBox(Long kidId, String drawingBoxName) {
        Kid kid = kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));

        DrawingBox drawingBox = DrawingBox.builder()
                .kid(kid)
                .drawingBoxName(drawingBoxName)
                .drawingBoxCategory(BoxType.커스텀)
                .build();
        drawingBoxRepository.save(drawingBox);

        //KidServiceImpl 메서드와 동일
        Kid.KidInfoResponse response = Kid.KidInfoResponse.builder()
                .kidId(kid.getId())
                .kidName(kid.getKidName())
                .kidProfileImage(kid.getKidProfileImage())
                .kidBirth(kid.getKidBirth())
                .build();

        List<DrawingBox> drawingBoxList = kid.getDrawingBoxList();
        List<Kid.DrawingBoxDto> drawingBoxDtoList = new ArrayList<>(drawingBoxList.size());

        for (DrawingBox box : drawingBoxList){
            Optional<Drawing> firstDrawing = drawingRepository.findFirstByDrawingBox(box);
            String thumbnailImage = firstDrawing.isPresent() ? firstDrawing.get().getDrawingImagePath() : null;
            long drawingCount = drawingRepository.countByDrawingBox(box);

            Kid.DrawingBoxDto drawingBoxDto = Kid.DrawingBoxDto.builder()
                    .drawingBoxId(box.getId())
                    .drawingBoxName(box.getDrawingBoxName())
                    .drawingBoxCategory(box.getDrawingBoxCategory().toString())
                    .thumbnailImage(thumbnailImage)
                    .drawingCount(drawingCount)
                    .build();
            drawingBoxDtoList.add(drawingBoxDto);
        }

        response.setDrawingBoxDtoList(drawingBoxDtoList);

        return response;
    }

    /**
     * 커스텀 보관함이면 이름을 수정하고 true를 반환한다.
     * @param drawingBoxId
     * @param drawingBoxName
     * @return
     */
    @Override
    public Boolean updateDrawingBox(Long drawingBoxId, String drawingBoxName) {
        DrawingBox drawingBox = drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        if(drawingBox.getDrawingBoxCategory() == BoxType.커스텀){
            drawingBox.updateName(drawingBoxName);
            return true;
        }

        return false;
    }

    /**
     * 커스텀 보관함이면 삭제하고 true를 반환한다.
     * @param drawingBoxId
     * @return
     */
    @Override
    public Boolean deleteDrawingBox(Long drawingBoxId) {
        DrawingBox drawingBox = drawingBoxRepository.findById(drawingBoxId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_BOX_NOT_FOUND_ERROR));

        if(drawingBox.getDrawingBoxCategory() == BoxType.커스텀){
            drawingBoxRepository.delete(drawingBox);
            return true;
        }

        return false;
    }
}
