package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.dmc.model.Notice;
import com.dmc.payload.NoticeResponse;

public interface NoticeRepo extends JpaRepository<Notice, Integer> {
    
    @Query("SELECT new com.dmc.payload.NoticeResponse(n.id, n.title, n.header) FROM Notice n")
    List<NoticeResponse> findAllNoticeResponses();
}
