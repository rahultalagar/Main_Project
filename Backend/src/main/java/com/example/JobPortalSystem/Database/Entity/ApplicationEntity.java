package com.example.JobPortalSystem.Database.Entity;

import java.time.LocalDateTime;

import com.example.JobPortalSystem.enums.ApplicationStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "applications")
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 👤 User who applied
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuthUserEntity user;

    // 💼 Job applied for
    @ManyToOne
    @JoinColumn(name = "job_id")
    private JobEntity job;

    // 📌 Application status
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    // 📅 Applied date
    private LocalDateTime appliedDate;
}