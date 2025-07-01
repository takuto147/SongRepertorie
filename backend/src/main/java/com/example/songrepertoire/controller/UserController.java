package com.example.songrepertoire.controller;

import com.example.songrepertoire.model.User;
import com.example.songrepertoire.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public User register(
      @RequestParam String email,
      @RequestParam String password,
      @RequestParam String displayName) {
    return userService.register(email, password, displayName);
  }

  @PostMapping("/login")
  public User login(
      @RequestParam String email,
      @RequestParam String password) {
    Optional<User> userOpt = userService.login(email, password);
    return userOpt.orElseThrow(() -> new RuntimeException("認証失敗"));
  }

  @GetMapping("/me/{id}")
  public User getUser(@PathVariable Long id) {
    return userService.findById(id).orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
  }
}
