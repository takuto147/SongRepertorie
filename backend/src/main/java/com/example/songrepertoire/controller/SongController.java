package com.example.songrepertoire.controller;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.model.Tag;
import com.example.songrepertoire.service.SongService;
import com.example.songrepertoire.controller.dto.SongRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000")
public class SongController {
  
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
  public Song createSong(@RequestBody SongRequest request ) {
    Song song = new Song();
    applyRequestToSong(request, song);
    List<Long> tagIds = request.getTagIds(); 
    if (tagIds == null || tagIds.isEmpty()){
      return songService.save(song);
    }
    return songService.saveWithTags(song,tagIds);
  }

  // 更新
  @PutMapping("/{id}")
  public Song updateSong(@PathVariable Long id, @RequestBody SongRequest request) {
  Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("曲が見つかりません"));
  applyRequestToSong(request, song);
  return songService.save(song);
}

  // 削除
  @DeleteMapping("/{id}")
  public void deleteSong(@PathVariable Long id) {
    songService.deleteById(id);
  }

  // リクエストの内容を Song に反映
  private void applyRequestToSong(SongRequest request, Song song) {
    song.setTitle(request.getTitle());
    song.setArtist(request.getArtist());
    song.setKeyAdjustment(request.getKeyAdjustment());
    song.setScore(request.getScore());
    song.setCategory(request.getCategory());
    song.setMachine(request.getMachine());
    song.setIsFavorite(request.getIsFavorite());

    if (request.getTagIds() != null) {
      List<Tag> tags = songService.findTagsByIds(request.getTagIds());
      song.setTags(tags);
    }
  }
}
