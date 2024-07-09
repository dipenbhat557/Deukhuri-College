package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Notice;

public interface NoticeRepo extends JpaRepository<Notice, Object>{}