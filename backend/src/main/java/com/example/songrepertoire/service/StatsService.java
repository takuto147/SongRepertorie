package com.example.songrepertoire.service;

import com.example.songrepertoire.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatsService {

  // コンストラクタインジェクション
  private final SongRepository songRepository;

  public StatsService(SongRepository songRepository) {
    this.songRepository = songRepository;
  }

  // カテゴリ別の曲数を取得
  public Map<String, Long> getSongCountByCategory() {
    List<Object[]> rawData = songRepository.countSongsByCategory();
    return rawData.stream() // ストリームを作成(rawDataの要素を1つずつ処理 )
        .collect(Collectors.toMap( // ストリームの要素をMapに変換,
            row -> (String) row[0], // キーを設定(row[0]はカテゴリ名) ラムダ式という書き方(rowは要素)
            row -> (Long) row[1])); // 値を設定(row[1]はカテゴリ別の曲数) ラムダ式という書き方(rowは要素)
  }

  // アーティスト別の曲数を取得
  public Map<String, Long> getSongCountByArtistTop10() {
    List<Object[]> rawData = songRepository.countSongsByArtist();
    return rawData.stream()
        .limit(10)
        .collect(Collectors.toMap(
            row -> (String) row[0],
            row -> (Long) row[1]));
  }

  // スコアの平均値を取得
  public Double getAverageScore() {
    return songRepository.findAverageScore();
  }
}
