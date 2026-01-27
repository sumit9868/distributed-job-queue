package com.example.backend.entity;

import com.example.backend.constants.JobStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private Long userId;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
    private Integer retryCount = 0;
    private Integer maxRetries = 3;


}
