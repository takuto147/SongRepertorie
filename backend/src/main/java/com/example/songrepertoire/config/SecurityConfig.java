package com.example.songrepertoire.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) // CSRF無効化（API用なので問題なし）
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // 全リクエスト許可
        .build();
  }
}
