package geurime.api.service;

import geurime.database.entity.Drawing;
import geurime.database.repository.DrawingRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AiPredictServiceImpl {

    private final DrawingRepository drawingRepository;

    WebClient webClient = WebClient.create("https://k7a506.p.ssafy.io");


    public void predict(Long drawingId) {
        Drawing drawing = getDrawing(drawingId);
        String url = drawing.getDrawingImagePath();

        // url json형태로 바꿔줌
        String request = String.format("{\"url\":\"%s\"}", url);

        // webClient 이용하여 fastApi로 그림 분석 요청
        String responseJson = webClient.post()
                .uri("https://k7a506.p.ssafy.io/ai/predict")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 반환된 값(String)을 JSONParser로 JSONObject로 변환
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = null;
        try {
            jsonObject = (JSONObject) parser.parse(responseJson);
        } catch (ParseException e) {
            throw new RuntimeException(e.getMessage());
        }

        // Double float로 변환
        Double dep = (Double) jsonObject.get("depression");
        float depression = dep.floatValue();
        Double vio = (Double) jsonObject.get("violence");
        float violence = vio.floatValue();
        Double hap = (Double) jsonObject.get("happiness");
        float happiness = hap.floatValue();
        
        //DB에 값 저장
        drawing.changeDrawingEmotion(depression, violence, happiness);
    }

    private Drawing getDrawing(Long drawingId){
        return drawingRepository.findById(drawingId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));
    }
}
