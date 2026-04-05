package com.example.JobPortalSystem.common.mapper;

import com.example.JobPortalSystem.Database.Entity.ApplicationEntity;
import com.example.JobPortalSystem.User.dto.response.ApplicationResponse;

public class ApplicationMapper {

    // 🔄 Convert ApplicationEntity → ApplicationResponse
    public static ApplicationResponse toResponse(ApplicationEntity entity) {
    return new ApplicationResponse(
        entity.getId(), // ✅ ADD THIS
        entity.getJob().getId(),
        entity.getJob().getTitle(),
        entity.getJob().getCompany(),
        entity.getStatus(),
        entity.getAppliedDate()
    );
}
}