package geurime.api.service;

import geurime.database.entity.DrawingBox;
import geurime.database.entity.Kid;
import geurime.database.enums.BoxType;
import geurime.database.repository.DrawingBoxRepository;
import geurime.database.repository.KidRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingBoxServiceImpl implements DrawingBoxService {
    private final DrawingBoxRepository drawingBoxRepository;
    private final KidRepository kidRepository;

    /**
     * 커스텀 타입의 그림보관함을 생성한다.
     * @param kidId
     * @param drawingBoxName
     * @return
     */
    @Override
    public Long createDrawingBox(Long kidId, String drawingBoxName) {
        Kid kid = kidRepository.findById(kidId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.KID_NOT_FOUND_ERROR));

        DrawingBox drawingBox = DrawingBox.builder()
                .kid(kid)
                .drawingBoxName(drawingBoxName)
                .drawingBoxCategory(BoxType.커스텀)
                .build();
        drawingBoxRepository.save(drawingBox);

        return drawingBox.getId();
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
