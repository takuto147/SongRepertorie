package com.example.songrepertoire.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
// getter,setter作成
@Getter
@Setter
// 引数なし,全引数ありコンストラクタ作成
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

  // まずは最低限
}
