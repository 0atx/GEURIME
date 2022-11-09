package geurime.interceptor;

import geurime.config.jwt.JwtService;
import geurime.database.entity.Board;
import geurime.database.entity.User;
import geurime.database.repository.BoardRepository;
import geurime.database.repository.UserRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.BufferedReader;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class BoardInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);


        System.out.println("하위");

//        String accessToken = request.getHeader("accessToken");
//        String email = jwtService.getEmail(accessToken);
//        String provider = jwtService.getProvider(accessToken);
//
//        User userJwt = userRepository.findByEmailAndProvider(email, provider)
//                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
//
//        Board board = boardRepository.findById(Long.parseLong(value))
//                .orElseThrow(() -> new CustomException(CustomExceptionList.BOARD_NOT_FOUND_ERROR));
//
//        if(board.getUser().getId() == userJwt.getId()){
//            return true;
//        }
//
//        throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
        return true;

    }
}
