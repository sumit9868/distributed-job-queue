package com.example.backend.service;

import com.example.backend.constants.JobStatus;
import com.example.backend.dto.JobCreateDTO;
import com.example.backend.dto.JobResponseDTO;
import com.example.backend.dto.JobUpdateDTO;
import com.example.backend.entity.Job;
import com.example.backend.exceptions.JobNotFoundException;
import com.example.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public JobResponseDTO getJob(Long jobId){
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if(jobOptional.isPresent()){
            return buildResponse(jobOptional.get());
        }else{
            throw new JobNotFoundException(jobId);
        }
    }
    public JobResponseDTO submitJob(JobCreateDTO jobCreateDTO) {
        Job job = new Job();
        job.setTitle(jobCreateDTO.getTitle());
        job.setDescription(jobCreateDTO.getDescription());
        job.setStatus(JobStatus.PENDING);
        job.setUserId(jobCreateDTO.getUserId());
        return buildResponse(jobRepository.save(job));
    }

    public JobResponseDTO updateJob(Long jobId,JobUpdateDTO jobUpdateDTO){
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if(jobOptional.isPresent()){
            Job job = jobOptional.get();
            job.setTitle(jobUpdateDTO.getTitle());
            job.setDescription(jobUpdateDTO.getDescription());
            job.setStatus(jobUpdateDTO.getStatus());
            return buildResponse(jobRepository.save(job));
        }else{
            throw new JobNotFoundException(jobId);
        }
    }

    public Optional<Job> pollJobs(){
        return jobRepository.leaseNextJob();
    }

    public JobResponseDTO buildResponse(Job job){
        return JobResponseDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .status(job.getStatus())
                .userId(job.getUserId())
                .build();
    }

    public Boolean retryJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException(id));
        job.setStatus(JobStatus.RUNNING);
        if(job.getRetryCount()+1<job.getMaxRetries()){
            job.setRetryCount(job.getRetryCount()+1);
            jobRepository.save(job);
            return true;
        }else{
            log.info("Job with id {} has reached max retries", id);
            return false;
        }
    }

    public List<JobResponseDTO> getAllJobs(){
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream().map(this::buildResponse).toList();
    }

    public List<JobResponseDTO> getAllJobsForUser(Long userId) {
        List<Optional<Job>> optionalList = jobRepository.findJobByUserId(userId);
        return optionalList.stream()
                .filter(Optional::isPresent)
                .map(optionalJob -> buildResponse(optionalJob.get()))
                .toList();
    }
}
