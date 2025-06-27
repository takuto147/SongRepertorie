package com.example.songrepertoire.repository;

import com.example.songrepertoire.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
  // ここは何も書かなくても一覧・詳細取得が使える
}
