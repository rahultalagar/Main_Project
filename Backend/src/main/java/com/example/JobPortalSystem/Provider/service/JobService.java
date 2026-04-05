package com.example.JobPortalSystem.Provider.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Entity.JobEntity;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;
import com.example.JobPortalSystem.Database.Repository.JobRepository;
import com.example.JobPortalSystem.Provider.dto.request.CreateJobRequest;
import com.example.JobPortalSystem.Provider.dto.request.UpdateJobRequest;
import com.example.JobPortalSystem.User.dto.response.JobResponse;
import com.example.JobPortalSystem.common.mapper.JobMapper;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final AuthUserRepository userRepository;

    public JobService(JobRepository jobRepository, AuthUserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // 🚀 POST JOB
    public String createJob(CreateJobRequest request) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobEntity job = new JobEntity();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());

        // 🔗 Link with recruiter
        job.setPostedBy(user);

        jobRepository.save(job);

        return "Job created successfully";
    }

    // 📋 GET MY JOBS (🔥 FIXED)
    public List<JobResponse> getMyJobs() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ FIX: use ID instead of object
        List<JobEntity> jobs = jobRepository.findByPostedById(user.getId());

        return jobs.stream()
                .map(JobMapper::toResponse)
                .toList();
    }

    // ✏️ UPDATE JOB
    public String updateJob(Long jobId, UpdateJobRequest request) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // 🔐 Ownership check
        if (!job.getPostedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to update this job");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());

        jobRepository.save(job);

        return "Job updated successfully";
    }

    // 🗑 DELETE JOB
    public String deleteJob(Long jobId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // 🔐 Ownership check
        if (!job.getPostedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to delete this job");
        }

        jobRepository.delete(job);

        return "Job deleted successfully";
    }
}