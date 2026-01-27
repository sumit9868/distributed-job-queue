package com.example.backend.repository;

import com.example.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    @Query(value = """
    SELECT * FROM jobs
    WHERE status = 'PENDING'
    ORDER BY created_at 
    LIMIT 1
    FOR UPDATE SKIP LOCKED
    """, nativeQuery = true)
    Optional<Job> leaseNextJob();

//    @Modifying
//    @Query("UPDATE Job j SET j.status = :status, j.updatedAt = CURRENT_TIMESTAMP WHERE j.id = :id")
//    void updateStatus(@Param("id") Long id, @Param("status") JobStatus status);
//
//
//    @Modifying
//    @Query("UPDATE Job j SET j.retries = j.retries+1 WHERE j.id= :id")
//    void incrementRetries(@Param("id") Long id);
    @Query(value= """
    SELECT * FROM jobs
    WHERE user_id = :userId
    ORDER BY created_at DESC
""",nativeQuery = true)
    List<Optional<Job>> findJobByUserId(@Param("userId") Long userId);

}
