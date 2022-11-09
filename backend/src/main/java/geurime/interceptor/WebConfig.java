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

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {

        interceptorRegistry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/oauth/**");
        interceptorRegistry.addInterceptor(drawingInterceptor)
                .addPathPatterns("/drawings/**")
                .excludePathPatterns("/drawings/like/**")
                .excludePathPatterns("/drawings/box/**");

//                interceptorRegistry.addInterceptor(teamInterceptor)
//                .addPathPatterns("/ranking/team/{teamId}", "/routine/{teamId}", "/room/{teamId}/enter/{nickName}", "/room/{teamId}");
    }

}
