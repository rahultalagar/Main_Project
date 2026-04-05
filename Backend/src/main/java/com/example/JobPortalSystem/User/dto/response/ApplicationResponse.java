package com.example.JobPortalSystem.User.dto.response;

import java.time.LocalDateTime;

import com.example.JobPortalSystem.enums.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationResponse {

    private Long id; // ✅ ADD THIS

    private Long jobId;

    private String title;

    private String company;

    private ApplicationStatus status;

    private LocalDateTime appliedDate;
}