package geurime.interceptor;

import geurime.config.jwt.JwtService;
import geurime.database.entity.Drawing;
import geurime.database.entity.Family;
import geurime.database.entity.Kid;
import geurime.database.entity.User;
import geurime.database.repository.BoardRepository;
import geurime.database.repository.DrawingRepository;
import geurime.database.repository.UserRepository;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DrawingInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final DrawingRepository drawingRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String drawingIdString = pathVariables.get("drawingId");

        String accessToken = request.getHeader("accessToken");
        String email = jwtService.getEmail(accessToken);
        String provider = jwtService.getProvider(accessToken);

        User userJwt = userRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        Drawing drawing = drawingRepository.findById(Long.parseLong(drawingIdString))
                .orElseThrow(() -> new CustomException(CustomExceptionList.DRAWING_NOT_FOUND_ERROR));

        System.out.println("테스트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        Long ownerUserId = drawingRepository.getFamilyIdByDrawingId(Long.parseLong(drawingIdString));
        Long requestUserId = userJwt.getFamily().getId();
        
        System.out.println(ownerUserId == requestUserId);

        System.out.println("테스트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");

        //        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        //        String value = (String) pathVariables.get("teamId");
        //
        //        String accessToken = request.getHeader("accessToken");
        //        String email = jwtService.getEmail(accessToken);
        //        String provider = jwtService.getProvider(accessToken);
        //
        //        Long id = memberRepository.findByEmailAndProvider(email, provider).orElseThrow(
        //                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
        //        ).getId();
        return true;

    }
}
