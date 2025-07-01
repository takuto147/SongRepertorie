package com.example.songrepertoire.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String passwordHash; // パスワードはハッシュ化して保存

  @Column(nullable = false)
  private String displayName;

  @Column(nullable = false, updatable = false)
  private java.time.LocalDateTime createdAt;

  @Column(nullable = false)
  private java.time.LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = updatedAt = java.time.LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = java.time.LocalDateTime.now();
  }
}
