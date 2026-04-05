package com.example.JobPortalSystem.Database.Entity;

import com.example.JobPortalSystem.enums.JobType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "jobs")
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🧾 Job title
    private String title;

    // 📄 Job description
    private String description;

    // 🏢 Company name
    private String company;

    // 💰 Salary
    private Double salary;

    // 📍 Job location
    private String location;

    // 🕒 Job type (FULL_TIME / PART_TIME)
    @Enumerated(EnumType.STRING)
    private JobType jobType;

    // 👤 Recruiter who posted job
    @ManyToOne
    @JoinColumn(name = "posted_by")
    private AuthUserEntity postedBy;
}