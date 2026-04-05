package com.example.JobPortalSystem.Admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.JobPortalSystem.Admin.dto.response.UserResponse;
import com.example.JobPortalSystem.Admin.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 👑 GET ALL USERS
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = adminService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    // 👑 GET ALL JOBS (ADMIN)
    @GetMapping("/jobs")
    public ResponseEntity<List<com.example.JobPortalSystem.User.dto.response.JobResponse>> getAllJobs() {

        List<com.example.JobPortalSystem.User.dto.response.JobResponse> jobs = adminService.getAllJobs();

        return ResponseEntity.ok(jobs);
    }

    // 🗑 ADMIN DELETE JOB API
@DeleteMapping("/jobs/{id}")
public ResponseEntity<String> deleteJob(@PathVariable Long id) {

    String response = adminService.deleteJob(id);

    return ResponseEntity.ok(response);
}
}