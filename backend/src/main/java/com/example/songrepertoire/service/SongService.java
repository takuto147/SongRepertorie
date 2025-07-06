package com.example.songrepertoire.service;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.model.Tag;
import com.example.songrepertoire.repository.SongRepository;
import com.example.songrepertoire.repository.TagRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {

  private final SongRepository songRepository;
  private final TagRepository tagRepository;

  public SongService(SongRepository songRepository, TagRepository tagRepository) {
    this.songRepository = songRepository;
    this.tagRepository = tagRepository;
  }

  // 全ての曲を取得
  public List<Song> findAll() {
    return songRepository.findAll();
  }

  // 指定したIDの曲を取得
  public Optional<Song> findById(Long id) {
    return songRepository.findById(id);
  }

  // タグ付きで曲を保存
  public Song saveWithTags(Song song, List<Long> tagIds) {
    List<Tag> tags = tagRepository.findAllById(tagIds);
    song.setTags(tags);
    return songRepository.save(song);
  }

  // タグ付きで曲を更新　→　不要により削除(saveメソッドで対応可能)

  // 指定したIDの曲を削除
  public void deleteById(Long id) {
    songRepository.deleteById(id);
  }

  // 通常の保存（タグ操作なし）
  public Song save(Song song) {
    return songRepository.save(song);
  }

 // タグIDのリストからタグを取得
  public List<Tag> findTagsByIds(List<Long> tagIds) {
  return tagRepository.findAllById(tagIds);
}

}
