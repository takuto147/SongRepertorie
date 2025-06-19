package com.example.songRepertoire;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
  @GetMapping("/hello")
  public String hello() {
    return "Hello from Spring Boot!";
  }

  @GetMapping("/hello2")
  public String hello2() {
    return "Hello from Spring Boot!2";
  }

  @GetMapping("/hello3")
  public String hello3() {
    return "Hello from Spring Boot!3";
  }
}
