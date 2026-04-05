package com.example.JobPortalSystem.Provider.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.JobPortalSystem.Provider.dto.request.CreateJobRequest;
import com.example.JobPortalSystem.Provider.service.JobService;
import com.example.JobPortalSystem.User.dto.response.JobResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/provider/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // 🚀 POST JOB API
    @PostMapping
    public ResponseEntity<String> createJob(@Valid @RequestBody CreateJobRequest request) {

        String response = jobService.createJob(request);

        return ResponseEntity.ok(response);
    }

    // 📋 GET MY JOBS API
    @GetMapping("/my")
    public ResponseEntity<List<JobResponse>> getMyJobs() {

        List<JobResponse> jobs = jobService.getMyJobs();

        return ResponseEntity.ok(jobs);
    }

    // ✏️ UPDATE JOB API
    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody com.example.JobPortalSystem.Provider.dto.request.UpdateJobRequest request) {

        String response = jobService.updateJob(id, request);

        return ResponseEntity.ok(response);
    }
    // 🗑 DELETE JOB API
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteJob(@PathVariable Long id) {

    String response = jobService.deleteJob(id);

    return ResponseEntity.ok(response);
}

}