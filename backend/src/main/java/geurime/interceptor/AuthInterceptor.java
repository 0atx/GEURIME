package geurime.interceptor;

import geurime.config.jwt.JwtService;
import geurime.exception.CustomException;
import geurime.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        if (url.contains("swagger") || url.contains("api-docs") || url.contains("webjars")) {
            return true;
        }

        String accessToken = request.getHeader("accessToken");
        if (jwtService.verifyToken(accessToken)) {
            return true;
        }
//
//        CustomExceptionList accessTokenError = CustomExceptionList.ACCESS_TOKEN_ERROR;
//
//        request.setAttribute("message", accessTokenError.getMessage());
//        request.setAttribute("exception", "AuthenticationException");
//        request.getRequestDispatcher("/error").forward(request, response);
//        System.out.println("request = " + request);
//        return false;

        throw new CustomException(CustomExceptionList.ACCESS_TOKEN_ERROR);
    }

}