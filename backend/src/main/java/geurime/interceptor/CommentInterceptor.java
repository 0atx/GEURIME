package geurime.interceptor;

import geurime.config.jwt.JwtService;
import geurime.database.entity.User;
import geurime.database.repository.CommentRepository;
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
public class CommentInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String method = request.getMethod();
        var commentIdString = pathVariables.get("commentId");
        if(commentIdString == null){
            throw new CustomException(CustomExceptionList.BAD_REQUEST_ERROR);
        }

        if(method.equals("PUT") || method.equals("DELETE")){

            String accessToken = request.getHeader("accessToken");
            String email = jwtService.getEmail(accessToken);
            String provider = jwtService.getProvider(accessToken);

            var userJwt = userRepository.findByEmailAndProvider(email, provider)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

            Long requestUserId = commentRepository.getUserIdByCommentId(Long.parseLong(commentIdString));

            if(!userJwt.getId().equals(requestUserId)){
                throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
            }

        }

        return true;
    }
}
