package com.example.songrepertoire.service;

import com.example.songrepertoire.model.Song;
import com.example.songrepertoire.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

  private final SongRepository songRepo;

  public SongService(SongRepository songRepo) {
    this.songRepo = songRepo;
  }

  public List<Song> findAll() {
    return songRepo.findAll();
  }
}