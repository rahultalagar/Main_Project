package com.example.JobPortalSystem.Database.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;

public interface AuthUserRepository extends JpaRepository <AuthUserEntity, Long> {
    Optional <AuthUserEntity> findByUsername(String username);
    Optional <AuthUserEntity> findByEmail(String email);

    
} 
    