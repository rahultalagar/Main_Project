package com.example.JobPortalSystem.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;
import com.example.JobPortalSystem.auth.JWT.JwtUtil;
import com.example.JobPortalSystem.auth.dto.request.LoginRequest;
import com.example.JobPortalSystem.auth.dto.request.RegisterRequest;
import com.example.JobPortalSystem.auth.dto.response.AuthResponse;

@Service
public class AuthService {

    private final AuthUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 🔧 Constructor Injection
    public AuthService(AuthUserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // 📝 REGISTER METHOD
    public String register(RegisterRequest request) {

        // ✅ Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // 🔐 Encrypt password
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 🧩 Create new user entity
        AuthUserEntity user = new AuthUserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(request.getRole());

        // 💾 Save to database
        userRepository.save(user);

        return "User registered successfully";
    }

    // 🔐 LOGIN METHOD
    public AuthResponse login(LoginRequest request) {

        // 🔍 Find user by email
        AuthUserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔑 Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 🎟 Generate JWT token (WITH ROLE)
        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        // 📤 RETURN TOKEN + ROLE (VERY IMPORTANT FOR FRONTEND)
        return new AuthResponse(
                token,
                "Login successful",
                user.getRole().name()   // 🔥 IMPORTANT
        );
    }
}