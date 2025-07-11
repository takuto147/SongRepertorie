package com.example.songrepertoire.controller.dto;

import com.example.songrepertoire.model.Tag;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;

@Data
public class SongResponse {
  private Long id;
  private String title;
  private String artist;
  @JsonProperty("key")
  private Integer keyAdjustment;
  private Integer score;
  private String category;
  private String machine;
  private Boolean isFavorite;
  private List<Tag> tags;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private String jacket;
  private String memo;
}