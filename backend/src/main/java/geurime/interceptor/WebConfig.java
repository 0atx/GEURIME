package geurime.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final BoardInterceptor boardInterceptor;
    private final DrawingInterceptor drawingInterceptor;
    private final KidInterceptor kidInterceptor;
    private final UserInterceptor userInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {

        interceptorRegistry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/oauth/**");
        interceptorRegistry.addInterceptor(boardInterceptor)
                .addPathPatterns("/boards/**");
        interceptorRegistry.addInterceptor(drawingInterceptor)
                .addPathPatterns("/drawings/**")
                .addPathPatterns("/diaries/**");
        interceptorRegistry.addInterceptor(kidInterceptor)
                .addPathPatterns("/kids/**");
        interceptorRegistry.addInterceptor(userInterceptor)
                .addPathPatterns("/users/**")
                .excludePathPatterns("/users/nickname");
    }

}
