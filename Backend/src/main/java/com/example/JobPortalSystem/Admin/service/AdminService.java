package com.example.JobPortalSystem.Admin.service;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Admin.dto.response.UserResponse;
import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Entity.JobEntity;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;
import com.example.JobPortalSystem.Database.Repository.JobRepository;
import com.example.JobPortalSystem.common.mapper.JobMapper;

@Service
public class AdminService {

    private final AuthUserRepository userRepository;
    private final JobRepository jobRepository;

    

    public AdminService(AuthUserRepository userRepository, JobRepository jobRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    // 👑 GET ALL USERS
    public List<UserResponse> getAllUsers() {

        List<AuthUserEntity> users = userRepository.findAll();

        return users.stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole()))
                .collect(Collectors.toList());
    }

    // 👑 GET ALL JOBS (ADMIN)
    public List<com.example.JobPortalSystem.User.dto.response.JobResponse> getAllJobs() {

        List<com.example.JobPortalSystem.Database.Entity.JobEntity> jobs = jobRepository.findAll();

       return jobs.stream()
        .map(JobMapper::toResponse)
        .toList();
    }  
    
    // 🗑 ADMIN DELETE JOB
public String deleteJob(Long jobId) {

    // 🔎 Fetch job
    JobEntity job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    // 🗑 Delete
    jobRepository.delete(job);

    return "Job deleted by admin successfully";
}
}