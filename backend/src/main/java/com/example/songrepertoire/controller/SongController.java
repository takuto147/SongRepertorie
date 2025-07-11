package com.example.songrepertoire.controller;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.model.Tag;
import com.example.songrepertoire.service.SongService;
import com.example.songrepertoire.controller.dto.SongRequest;
import com.example.songrepertoire.controller.dto.SongResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
  public List<SongResponse> getAllSongs() {
    return songService.findAll().stream().map(this::toResponse).collect(Collectors.toList());
  }

  // 詳細取得
  @GetMapping("/{id}")
  public SongResponse getSongById(@PathVariable Long id) {
    Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("曲が見つかりません"));
    return toResponse(song);
  }

  // 登録
  @PostMapping
  public SongResponse createSong(@RequestBody SongRequest request) {
    Song song = new Song();
    applyRequestToSong(request, song);
    List<Long> tagIds = request.getTagIds();
    Song saved;
    if (tagIds == null || tagIds.isEmpty()) {
      saved = songService.save(song);
    } else {
      saved = songService.saveWithTags(song, tagIds);
    }
    return toResponse(saved);
  }

  // 更新
  @PutMapping("/{id}")
  public SongResponse updateSong(@PathVariable Long id, @RequestBody SongRequest request) {
    Song song = songService.findById(id).orElseThrow(() -> new RuntimeException("曲が見つかりません"));
    applyRequestToSong(request, song);
    Song saved = songService.save(song);
    return toResponse(saved);
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
    song.setKeyAdjustment(request.getKey());
    song.setScore(request.getScore());
    song.setCategory(request.getCategory());
    song.setMachine(request.getMachine());
    song.setIsFavorite(request.getIsFavorite());
    song.setJacket(request.getJacket());
    song.setMemo(request.getMemo());

    if (request.getTagIds() != null) {
      List<Tag> tags = songService.findTagsByIds(request.getTagIds());
      song.setTags(tags);
    }
  }

  // SongエンティティからSongResponse DTOへの変換
  private SongResponse toResponse(Song song) {
    SongResponse dto = new SongResponse();
    dto.setId(song.getId());
    dto.setTitle(song.getTitle());
    dto.setArtist(song.getArtist());
    dto.setKeyAdjustment(song.getKeyAdjustment());
    dto.setScore(song.getScore());
    dto.setCategory(song.getCategory());
    dto.setMachine(song.getMachine());
    dto.setIsFavorite(song.getIsFavorite());
    dto.setJacket(song.getJacket());
    dto.setMemo(song.getMemo());
    dto.setTags(song.getTags());
    dto.setCreatedAt(song.getCreatedAt());
    dto.setUpdatedAt(song.getUpdatedAt());
    return dto;
  }
}
