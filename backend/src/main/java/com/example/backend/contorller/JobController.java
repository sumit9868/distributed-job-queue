package com.example.backend.contorller;

import com.example.backend.dto.JobCreateDTO;
import com.example.backend.dto.JobResponseDTO;
import com.example.backend.dto.JobUpdateDTO;
import com.example.backend.service.JobService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final UserService userService;
    @PostMapping("/submit")
    public ResponseEntity<JobResponseDTO> submitJob(@RequestBody JobCreateDTO jobCreateDTO){

        JobResponseDTO responseDTO = jobService.submitJob(jobCreateDTO);
        if(Objects.isNull(responseDTO)){
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobResponseDTO> getJob(@PathVariable Long jobId){
        return ResponseEntity.ok(jobService.getJob(jobId));
    }

    @GetMapping("/{jobID}/status")
    public ResponseEntity<JobResponseDTO> getJobStatus(@PathVariable Long jobID){
        JobResponseDTO responseDTO = jobService.getJob(jobID);
        return ResponseEntity.ok(responseDTO);
    }
    @PostMapping("/{jobId}/updateStatus")
    public ResponseEntity<String> updateJobStatus(@PathVariable Long jobId, @RequestBody JobUpdateDTO jobUpdateDTO){
        // Implementation for updating job status
        JobResponseDTO responseDTO = jobService.updateJob(jobId,jobUpdateDTO);
        return ResponseEntity.ok("Job status updated successfully to " + responseDTO.getStatus());
    }

    @CrossOrigin(
            origins = "http://localhost:3000",
            allowedHeaders = "*",
            allowCredentials = "true"
    )
    @GetMapping("/stream")
    public Flux<ServerSentEvent<List<JobResponseDTO>>> streamJobs(Authentication authentication) {
        Long userId = userService.getUserByUsername(authentication.getName()).getId();
        return Flux.interval(Duration.ofSeconds(2))
                .map(seq -> {
                    List<JobResponseDTO> jobs = jobService.getAllJobsForUser(userId); // service returns DTO list
                    return ServerSentEvent.<List<JobResponseDTO>>builder()
                            .id(String.valueOf(seq))
                            .event("job-update")
                            .data(jobs)
                            .build();
                });
    }


}
