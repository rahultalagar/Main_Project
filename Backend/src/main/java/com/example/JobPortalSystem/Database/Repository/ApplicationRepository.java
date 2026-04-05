package com.example.JobPortalSystem.Database.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JobPortalSystem.Database.Entity.ApplicationEntity;
import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Entity.JobEntity;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {

    // 🔍 Check if user already applied for job
    boolean existsByUserAndJob(AuthUserEntity user, JobEntity job);

    Optional<ApplicationEntity> findByUserAndJob(AuthUserEntity user, JobEntity job);
    List<ApplicationEntity> findByJob(JobEntity job);
    

List<ApplicationEntity> findByUser(AuthUserEntity user);
}