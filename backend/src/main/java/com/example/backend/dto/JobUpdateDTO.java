package com.example.backend.dto;

import com.example.backend.constants.JobStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JobUpdateDTO {
    private String title;
    private String description;
    private JobStatus status;
}
