package com.senacwebpatasdouradas.demo.securityconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll() // 1. Permite o H2
                        .anyRequest().authenticated() // 2. Exige login para todo o resto
                )
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/h2-console/**") // 3. Desliga CSRF SÓ para o H2
                )
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable) // 4. Permite iFrames
                )
                .httpBasic(Customizer.withDefaults()); // 5. Mantém o login pop-up

        return http.build();
    }
}