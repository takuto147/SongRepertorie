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
  private Long id; // ユーザーID

  @Column(nullable = false, unique = true)
  private String email; // メールアドレス

  @Column(nullable = false)
  private String passwordHash; // パスワードはハッシュ化して保存

  @Column(nullable = false)
  private String displayName; // 表示名

  @Column(nullable = false, updatable = false)
  private java.time.LocalDateTime createdAt; // 作成日時

  @Column(nullable = false)
  private java.time.LocalDateTime updatedAt; // 更新日時

  @PrePersist
  protected void onCreate() {
    createdAt = updatedAt = java.time.LocalDateTime.now(); // 作成日時と更新日時を現在日時に設定
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = java.time.LocalDateTime.now(); // 更新日時を現在日時に設定
  }
}
