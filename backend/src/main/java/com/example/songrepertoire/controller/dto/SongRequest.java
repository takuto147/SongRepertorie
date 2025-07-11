package com.example.songrepertoire.controller.dto;

import lombok.Data;
import java.util.List;

@Data
public class SongRequest {
  private String title;
  private String artist;
  private Integer key;
  private Integer score;
  private String category;
  private String machine;
  private Boolean isFavorite;
  private String jacket;
  private String memo;
  private List<Long> tagIds;
}
