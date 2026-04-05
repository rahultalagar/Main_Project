package com.example.JobPortalSystem.Provider.dto.request;

import com.example.JobPortalSystem.enums.JobType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateJobRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String company;

    @NotNull
    private Double salary;

    @NotBlank
    private String location;

    @NotNull
    private JobType jobType;
}
