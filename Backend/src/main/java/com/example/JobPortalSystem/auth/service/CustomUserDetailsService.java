package com.example.JobPortalSystem.auth.service;


import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.JobPortalSystem.Database.Entity.AuthUserEntity;
import com.example.JobPortalSystem.Database.Repository.AuthUserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthUserRepository userRepository;

    public CustomUserDetailsService(AuthUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔍 Load user using email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // 🔎 Fetch user from DB
        AuthUserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 🔄 Convert to Spring Security User
        return new User(
    user.getEmail(),
    user.getPassword(),
    java.util.List.of(
        new org.springframework.security.core.authority.SimpleGrantedAuthority(
            "ROLE_" + user.getRole().name()
        )
    )
);
    }
}