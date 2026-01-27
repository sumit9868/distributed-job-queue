package com.example.backend.exceptions;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Long jobID) {
        super("Job with jobId: '" + jobID + "' not found");
    }
}
