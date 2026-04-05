package com.example.JobPortalSystem.common.mapper;

import com.example.JobPortalSystem.Database.Entity.JobEntity;
import com.example.JobPortalSystem.User.dto.response.JobResponse;

public class JobMapper {

    // 🔄 Convert Entity → DTO
    public static JobResponse toResponse(JobEntity job) {

        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getCompany(),
                job.getSalary(),
                job.getLocation(),
                job.getJobType()
        );
    }
}