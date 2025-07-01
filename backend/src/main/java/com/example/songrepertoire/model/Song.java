package com.example.songrepertoire.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Song {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String artist;

  @Column
  private Integer keyAdjustment; // 歌唱キー

  @Column
  private Integer score; // カラオケのスコア

  @Column
  private String category; // 任意のカテゴリ名

  @Column
  private String machine; // カラオケ機種名

  @Column
  private Boolean isFavorite;

  @Column
  private java.time.LocalDateTime createdAt;

  @Column
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
