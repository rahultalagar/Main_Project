package com.example.JobPortalSystem.Database.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, Long> {

    // 🔍 Fetch jobs by recruiter
    List<JobEntity> findByPostedBy(AuthUserEntity user);
    List<JobEntity> findByPostedById(Long postedById);
   
    
}