package com.example.JobPortalSystem.User.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Database.Entity.JobEntity;
import com.example.JobPortalSystem.Database.Repository.JobRepository;
import com.example.JobPortalSystem.User.dto.response.JobResponse;

@Service
public class UserJobService {

    private final JobRepository jobRepository;

    public UserJobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // 📋 GET ALL JOBS
    public List<JobResponse> getAllJobs() {

        // 🔎 Fetch all jobs from DB
        List<JobEntity> jobs = jobRepository.findAll();

        // 🔄 Convert Entity → DTO
        return jobs.stream()
                .map(job -> new JobResponse(
                        job.getId(),
                        job.getTitle(),
                        job.getDescription(),
                        job.getCompany(),
                        job.getSalary(),
                        job.getLocation(),
                        job.getJobType()
                ))
                .collect(Collectors.toList());
    }
}