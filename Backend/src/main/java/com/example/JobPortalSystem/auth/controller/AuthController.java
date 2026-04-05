package com.example.JobPortalSystem.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.JobPortalSystem.auth.dto.request.LoginRequest;
import com.example.JobPortalSystem.auth.dto.request.RegisterRequest;
import com.example.JobPortalSystem.auth.dto.response.AuthResponse;
import com.example.JobPortalSystem.auth.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // 🔧 Constructor Injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 📝 REGISTER API
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {

        String response = authService.register(request);

        return ResponseEntity.ok(response);
    }

    // 🔐 LOGIN API
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}