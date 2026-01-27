import React, { useEffect, useState } from "react";
import "../styles/JobDashboard.css";

function JobDashboard() {
    const [jobs, setJobs] = useState([]);
    const [connectionState, setConnectionState] = useState("connecting");

    useEffect(() => {
        const eventSource = new EventSource(
            "http://localhost:8080/jobs/stream", 
            { withCredentials: true }
        );

        eventSource.onopen = () => {
            setConnectionState("connected");
        };

        eventSource.addEventListener("job-update", (event) => {
            try {
                const jsonArray = JSON.parse(event.data);
                setJobs(jsonArray);
            } catch (err) {
                console.error("Failed to parse SSE data:", err);
            }
        });

        eventSource.onerror = (err) => {
            console.error("EventSource error:", err);
            if (eventSource.readyState === 2) {
                setConnectionState("closed");
            } else {
                setConnectionState("error");
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const totalJobs = jobs.length;
    const doneJobs = jobs.filter(job => job.status === "DONE").length;
    const failedJobs = jobs.filter(job => job.status === "FAILED").length;
    const pendingJobs = jobs.filter(job => job.status === "PENDING").length;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Live Job Dashboard</h1>
                <div className={`connection-badge ${connectionState === 'connected' ? 'connected' : 'disconnected'}`}>
                    {connectionState === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-label">Total Jobs</div>
                    <div className="stat-value">{totalJobs}</div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-label">Completed</div>
                    <div className="stat-value">{doneJobs}</div>
                </div>

                <div className="stat-card failed">
                    <div className="stat-label">Failed</div>
                    <div className="stat-value">{failedJobs}</div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-label">Pending</div>
                    <div className="stat-value">{pendingJobs}</div>
                </div>
            </div>

            {jobs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <p className="empty-text">No jobs found for this user.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="jobs-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td className="job-title">{job.title}</td>
                                    <td>{job.description}</td>
                                    <td>
                                        <span className={`status-badge ${job.status.toLowerCase()}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default JobDashboard;