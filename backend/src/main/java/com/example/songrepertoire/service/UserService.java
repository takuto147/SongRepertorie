package com.example.songrepertoire.service;

import com.example.songrepertoire.model.User;
import com.example.songrepertoire.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  // コンストラクタインジェクション
  private final UserRepository userRepository;

  // パスワードのハッシュ化
  private final BCryptPasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  // ユーザー登録
  public User register(String email, String rawPassword, String displayName) {
    String hashed = passwordEncoder.encode(rawPassword);
    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(hashed);
    user.setDisplayName(displayName);
    return userRepository.save(user);
  }

  // ユーザーログイン
  public Optional<User> login(String email, String rawPassword) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isPresent()) {
      User user = userOpt.get();
      if (passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
        return Optional.of(user);
      }
    }
    return Optional.empty();
  }

  // 指定したIDのユーザーを取得
  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }
}
