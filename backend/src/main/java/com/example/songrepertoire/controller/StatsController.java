package com.example.songrepertoire.controller;

import com.example.songrepertoire.service.StatsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin
public class StatsController {

  private final StatsService statsService;

  public StatsController(StatsService statsService) {
    this.statsService = statsService;
  }

  @GetMapping("/categories")
  public Map<String, Long> getCategoryStats() {
    return statsService.getSongCountByCategory();
  }

  @GetMapping("/artists")
  public Map<String, Long> getArtistStats() {
    return statsService.getSongCountByArtistTop10();
  }

  @GetMapping("/average-score")
  public Double getAverageScore() {
    return statsService.getAverageScore();
  }
}
