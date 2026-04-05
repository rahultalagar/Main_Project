package com.example.JobPortalSystem.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String message;
    private String role; // 🔥 ADD THIS
}