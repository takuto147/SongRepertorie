package com.example.songrepertoire.controller;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.service.SongService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin // フロント (localhost:5173 等) からアクセスしやすいように
public class SongController {

  private final SongService songService;

  // DI
  public SongController(SongService songService) {
    this.songService = songService;
  }

  // 一覧取得
  @GetMapping
  public List<Song> getAllSongs() {
    return songService.findAll();
  }
}
