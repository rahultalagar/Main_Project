package com.example.JobPortalSystem.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.JobPortalSystem.User.service.ApplicationService;

@RestController
@RequestMapping("/api/user")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // 🚀 APPLY JOB API
    @PostMapping("/apply/{jobId}")
    public ResponseEntity<?> applyJob(@PathVariable Long jobId) {
        try {
            String response = applicationService.applyJob(jobId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // ✅ RETURN PROPER ERROR MESSAGE
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 📋 GET MY APPLICATIONS API
    @GetMapping("/applications")
    public ResponseEntity<?> getMyApplications() {
        return ResponseEntity.ok(applicationService.getMyApplications());
    }

    // 🛑 CANCEL APPLICATION API
    @PutMapping("/applications/{id}/cancel")
    public ResponseEntity<?> cancelApplication(@PathVariable Long id) {
        try {
            String response = applicationService.cancelApplication(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/provider/job/{jobId}/applications")
    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    @PutMapping("/provider/application/{id}/status")
public ResponseEntity<?> updateStatus(
        @PathVariable Long id,
        @RequestParam String status) {

    return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
}
}