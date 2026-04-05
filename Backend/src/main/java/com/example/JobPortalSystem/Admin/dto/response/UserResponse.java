package com.example.JobPortalSystem.Admin.dto.response;

import com.example.JobPortalSystem.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    private Long id;

    private String username;

    private String email;

    private Role role;
}