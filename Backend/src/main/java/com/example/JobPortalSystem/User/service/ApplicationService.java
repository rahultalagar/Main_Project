package com.example.JobPortalSystem.User.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Database.Entity.ApplicationEntity;
import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Entity.JobEntity;
import com.example.JobPortalSystem.Database.Repository.ApplicationRepository;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;
import com.example.JobPortalSystem.Database.Repository.JobRepository;
import com.example.JobPortalSystem.User.dto.response.ApplicationResponse;
import com.example.JobPortalSystem.common.mapper.ApplicationMapper;
import com.example.JobPortalSystem.enums.ApplicationStatus;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final AuthUserRepository userRepository;
    private final JobRepository jobRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              AuthUserRepository userRepository,
                              JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    // 🚀 APPLY JOB
    public String applyJob(Long jobId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Optional<ApplicationEntity> existingApp =
                applicationRepository.findByUserAndJob(user, job);

        if (existingApp.isPresent()) {

            ApplicationEntity app = existingApp.get();

            if (app.getStatus() == ApplicationStatus.APPLIED) {
                throw new RuntimeException("You have already applied for this job");
            }

            if (app.getStatus() == ApplicationStatus.CANCELLED) {
                app.setStatus(ApplicationStatus.APPLIED);
                app.setAppliedDate(LocalDateTime.now());
                applicationRepository.save(app);

                return "Job applied again successfully";
            }
        }

        ApplicationEntity application = new ApplicationEntity();
        application.setUser(user);
        application.setJob(job);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedDate(LocalDateTime.now());

        applicationRepository.save(application);

        return "Job applied successfully";
    }

    // 📋 GET MY APPLICATIONS
    public List<ApplicationResponse> getMyApplications() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return applicationRepository.findByUser(user)
                .stream()
                .map(ApplicationMapper::toResponse)
                .toList();
    }

    // 🛑 CANCEL APPLICATION
    public String cancelApplication(Long applicationId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ApplicationEntity application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to cancel this application");
        }

        if (application.getStatus() != ApplicationStatus.APPLIED) {
            throw new RuntimeException("Cannot cancel this application");
        }

        application.setStatus(ApplicationStatus.CANCELLED);
        applicationRepository.save(application);

        return "Application cancelled successfully";
    }

    // 📊 GET APPLICATIONS BY JOB (FOR RECRUITER) ✅ FIXED
    public List<ApplicationResponse> getApplicationsByJob(Long jobId) {

        // 🔐 Get logged-in recruiter
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔎 Get job
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ✅ FIX: ownership check using ID (IMPORTANT)
       if (!job.getPostedBy().getId().equals(user.getId())) {
    return List.of();  // ✅ IMPORTANT FIX (no error now)
}

        // 📥 Fetch applications
        return applicationRepository.findByJob(job)
                .stream()
                .map(ApplicationMapper::toResponse)
                .toList();
    }

    // ✅ UPDATE STATUS (SELECT / REJECT)
    public String updateApplicationStatus(Long id, String status) {

        ApplicationEntity app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (status.equals("SELECTED")) {
            app.setStatus(ApplicationStatus.SELECTED);
        } else if (status.equals("REJECTED")) {
            app.setStatus(ApplicationStatus.REJECTED);
        } else {
            throw new RuntimeException("Invalid status");
        }

        applicationRepository.save(app);

        return "Status updated successfully";
    }
}