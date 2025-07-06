package com.example.songrepertoire.repository;

import com.example.songrepertoire.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

  // カテゴリ別の曲数を取得
  @Query("SELECT s.category, COUNT(s) FROM Song s GROUP BY s.category")
  List<Object[]> countSongsByCategory();

  // アーティスト別の曲数を取得
  @Query("SELECT s.artist, COUNT(s) FROM Song s GROUP BY s.artist ORDER BY COUNT(s) DESC")
  List<Object[]> countSongsByArtist();

  // スコアの平均値を取得
  @Query("SELECT AVG(s.score) FROM Song s WHERE s.score IS NOT NULL")
  Double findAverageScore();

  // // お気に入りの曲を取得
  // @Query("SELECT COUNT(s) FROM Song s WHERE s.isFavorite = 1")
  // Long countFavoriteSongs();
}
