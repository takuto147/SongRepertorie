package com.example.songrepertoire.service;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {

  // コンストラクタインジェクション
  private final SongRepository songRepository;

  public SongService(SongRepository songRepository) {
    this.songRepository = songRepository;
  }

  // 全ての曲を取得
  public List<Song> findAll() {
    return songRepository.findAll();
  }

  // 指定したIDの曲を取得
  public Optional<Song> findById(Long id) {
    return songRepository.findById(id);
  }

  // 曲を保存
  public Song save(Song song) {
    return songRepository.save(song);
  }

  // 指定したIDの曲を削除
  public void deleteById(Long id) {
    songRepository.deleteById(id);
  }
}
