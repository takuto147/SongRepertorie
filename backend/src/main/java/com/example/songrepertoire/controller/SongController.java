package com.example.songapp.controller;

import com.example.songapp.model.Song;
import com.example.songapp.service.SongService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin // フロント (localhost:5173 等) からアクセスしやすいように
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
}
