package geurime.api.service;
/*
 @author 신지한
 @since 2022-10-20
*/
import geurime.api.dto.DrawingRequest;
import geurime.api.dto.DrawingResponse;
import geurime.database.entity.Drawing;
import geurime.database.entity.DrawingBox;
import geurime.database.repository.DrawingBoxRepository;
import geurime.database.repository.DrawingRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DrawingService {

    private final DrawingRepository drawingRepository;
    private final DrawingBoxRepository drawingBoxRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public DrawingResponse readDrawing(Long drawingId){
        Drawing drawing = drawingRepository.findById(drawingId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
        return modelMapper.map(drawing, DrawingResponse.class);
    }

    /**
     * request를 받아 이미지를 업로드하고 반환된 이미지경로를 저장한다
     * @param request 보관함id, 그림제목, 이미지경로(변경예정)
     * @return 저장된 그림의 id
     */
    public Long createDrawing(DrawingRequest request){
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
}
