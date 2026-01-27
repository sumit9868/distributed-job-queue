package com.example.backend.service;

import com.example.backend.constants.JobStatus;
import com.example.backend.dto.JobUpdateDTO;
import com.example.backend.entity.Job;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobWorker {
    private final JobService jobService;
    private Random random = new Random();
    @Scheduled(fixedDelay = 1000) // Poll every 10 seconds
    public void pollJobs() {
        Optional<Job> polledJob = jobService.pollJobs();
        polledJob.ifPresent(job -> {
            // Process the job
            log.info("Processing job with ID: {}", job.getId());
            process(job);
            // Add your job processing logic here
        });
    }

    private void process(Job job) {
        // Simulate job processing
        try {
            Thread.sleep(5000); // Simulate time-consuming task
            log.info("Job with ID: {} is running now.", job.getId());
            job.setStatus(JobStatus.RUNNING);
            jobService.updateJob(job.getId(), buildUpdateDTO(job)); // Update the job in the database
            if(random.nextInt(10)>=8){ // Simulate random success/failure
                ack(job);
            }else{
                retry(job);
            }
        } catch (InterruptedException e) {
            log.error("Error processing job with ID: {}", job.getId(), e);
            Thread.currentThread().interrupt();
        }
    }

    private void retry(Job job) {
        log.info("Job with ID: {} failed attempt: {} Retrying...", job.getId(),job.getRetryCount());
        if(jobService.retryJob(job.getId())){
            process(job);
        }else{
            fail(job);
        }
    }


    private void ack(Job job) {
        log.info("Job with ID: {} completed successfully.", job.getId());
        job.setStatus(JobStatus.DONE);
        jobService.updateJob(job.getId(), buildUpdateDTO(job)); // Update the job in the database
    }

    private void fail(Job job) {
        log.info("Job with ID: {} has reached max retries. Marking as FAILED.", job.getId());
        job.setStatus(JobStatus.FAILED);
        jobService.updateJob(job.getId(), buildUpdateDTO(job)); // Update the job in the database
    }
    private JobUpdateDTO buildUpdateDTO(Job job){
        return JobUpdateDTO.builder()
                .description(job.getDescription())
                .title(job.getTitle())
                .status(job.getStatus())
                .build();
    }
}
