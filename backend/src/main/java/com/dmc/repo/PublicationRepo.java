package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.dmc.model.Publication;
import com.dmc.payload.PublicationResponse;

public interface PublicationRepo extends JpaRepository<Publication, Integer> {

    @Query("SELECT new com.dmc.payload.PublicationResponse(p.id, p.title, p.type, p.hidden) FROM Publication p")
    List<PublicationResponse> findAllPublicationResponses();
}