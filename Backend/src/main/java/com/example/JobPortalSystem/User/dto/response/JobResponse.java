package com.example.JobPortalSystem.User.dto.response;

import com.example.JobPortalSystem.enums.JobType;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobResponse {

    private Long id;

    private String title;

    private String description;

    private String company;

    private Double salary;

    private String location;

    private JobType jobType;
}