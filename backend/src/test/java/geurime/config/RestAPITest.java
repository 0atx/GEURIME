package geurime.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.DoubleNode;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestAPITest {

    @Test
    void Test1() throws JSONException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        String imageUrl = "https://as2.ftcdn.net/v2/jpg/01/04/06/99/1000_F_104069980_ub2XiCcuHiyJcYojnkGqBYsMDuEn81ps.jpg";
        String apiUrl = "https://k7a506.p.ssafy.io/ai/predict/";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject imageJsonObject = new JSONObject();
        imageJsonObject.put("url", imageUrl);

        HttpEntity<String> request = new HttpEntity<String>(imageJsonObject.toString(), headers);

        String imageResult = restTemplate.postForObject(apiUrl, request, String.class);
        JsonNode root = objectMapper.readTree(imageResult);

        System.out.println(imageResult);
        JsonNode happiness = root.get("happiness");
        System.out.println(happiness);

        Double score = Double.valueOf(root.get("happiness").toString()) * 100;

    }

}