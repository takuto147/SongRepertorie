package com.example.songrepertoire.controller;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.service.SongService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin
public class SongController {

  // コンストラクタインジェクション
  private final SongService songService;

  public SongController(SongService songService) {
    this.songService = songService;
  }

  // 一覧取得
  @GetMapping
  public List<Song> getAllSongs() {
    return songService.findAll();
  }

  // 詳細取得
  @GetMapping("/{id}")
  public Song getSongById(@PathVariable Long id) {
    return songService.findById(id).orElseThrow(() -> new RuntimeException("曲が見つかりません"));
  }

  // 登録
  @PostMapping
  public Song createSong(@RequestBody Song song) {
    return songService.save(song);
  }

  // 更新
  @PutMapping("/{id}")
  public Song updateSong(@PathVariable Long id, @RequestBody Song updatedSong) {
    Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("曲が見つかりません"));

    song.setTitle(updatedSong.getTitle());
    song.setArtist(updatedSong.getArtist());
    song.setKeyAdjustment(updatedSong.getKeyAdjustment());
    song.setScore(updatedSong.getScore());
    song.setCategory(updatedSong.getCategory());
    song.setMachine(updatedSong.getMachine());
    song.setIsFavorite(updatedSong.getIsFavorite());

    return songService.save(song);
  }

  // 削除
  @DeleteMapping("/{id}")
  public void deleteSong(@PathVariable Long id) {
    songService.deleteById(id);
  }
}
