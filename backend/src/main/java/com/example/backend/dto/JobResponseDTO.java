package com.example.backend.dto;

import com.example.backend.constants.JobStatus;
import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class JobResponseDTO {

    private Long id;
    private String description;
    private String title;
    private JobStatus status;
    private Long userId;
}
