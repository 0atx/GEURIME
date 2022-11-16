package geurime.config.auth;

import geurime.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthService authService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .logout().logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/oauth/info", true)
                .userInfoEndpoint()
                .userService(authService);

        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("http://localhost:[*]");
        configuration.addAllowedOriginPattern("http://k7a506.p.ssafy.io:[*]");
//        configuration.addAllowedOriginPattern("https://geurime.com");
        configuration.addAllowedOriginPattern("https://k7a506.p.ssafy.io:[*]");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }

}
