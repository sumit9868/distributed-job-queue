package com.example.backend.constants;

import lombok.Getter;

@Getter
public enum JobStatus {
    PENDING("Pending"),
    RUNNING("Running"),
    DONE("Done"),
    FAILED("Failed");

    private final String name;
    JobStatus(String name) {
        this.name = name;
    }

}
