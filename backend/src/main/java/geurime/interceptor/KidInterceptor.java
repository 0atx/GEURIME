package geurime.interceptor;

import geurime.config.jwt.JwtService;
import geurime.database.entity.User;
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
import java.util.Map;

@Component
@RequiredArgsConstructor
public class KidInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final DrawingRepository drawingRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String method = request.getMethod();
        if(method.equals("POST")){
            return true;
        }
        String kidIdString = pathVariables.get("kidId");

        //pathvariable 없는 경우
        if(kidIdString == null){
            throw new CustomException(CustomExceptionList.BAD_REQUEST_ERROR);
        }

        String accessToken = request.getHeader("accessToken");
        String email = jwtService.getEmail(accessToken);
        String provider = jwtService.getProvider(accessToken);

        User userJwt = userRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        Long requestFamilyId = userJwt.getFamily().getId();

        //kidId 받는 API
        Long kidFamilyId = drawingRepository.getFamilyIdByKidId(Long.parseLong(kidIdString));

        if(requestFamilyId == null || !requestFamilyId.equals(kidFamilyId)){
            throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
        }

        return true;

    }
}
