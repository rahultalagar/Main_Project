package com.example.JobPortalSystem.Provider.dto.request;

import com.example.JobPortalSystem.enums.JobType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateJobRequest {

    // 🧾 Job title
    @NotBlank(message = "Title is required")
    private String title;

    // 📄 Description
    @NotBlank(message = "Description is required")
    private String description;

    // 🏢 Company
    @NotBlank(message = "Company is required")
    private String company;

    // 💰 Salary
    @NotNull(message = "Salary is required")
    private Double salary;

    // 📍 Location
    @NotBlank(message = "Location is required")
    private String location;

    // 🕒 Job type
    @NotNull(message = "Job type is required")
    private JobType jobType;
}