 package com.example.JobPortalSystem.User.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.JobPortalSystem.User.dto.response.JobResponse;
import com.example.JobPortalSystem.User.service.UserJobService;

@RestController
@RequestMapping("/api/user/jobs")
public class UserJobController {

    private final UserJobService userJobService;

    public UserJobController(UserJobService userJobService) {
        this.userJobService = userJobService;
    }

    // 📋 GET ALL JOBS
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        List<JobResponse> jobs = userJobService.getAllJobs();

        return ResponseEntity.ok(jobs);
    }
}