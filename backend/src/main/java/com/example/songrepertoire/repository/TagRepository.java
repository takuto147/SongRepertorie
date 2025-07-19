package com.example.songrepertoire.repository;

import com.example.songrepertoire.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
