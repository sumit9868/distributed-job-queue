import React, { useEffect, useState } from "react";

function JobDashboard() {
    const [jobs, setJobs] = useState([]);
    const [connectionState, setConnectionState] = useState("connecting");

    useEffect(() => {
        const eventSource = new EventSource(
            "http://localhost:8080/jobs/stream", 
            { withCredentials: true }
        );

        eventSource.onopen = () => {
            console.log("✅ EventSource connection opened");
            setConnectionState("connected");
        };

        eventSource.addEventListener("job-update", (event) => {
            try {
                const jsonArray = JSON.parse(event.data);
                setJobs(jsonArray);
            } catch (err) {
                console.error("❌ Failed to parse SSE data:", err);
            }
        });

        eventSource.onerror = (err) => {
            console.error("❌ EventSource error:", err);
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

    // Calculate statistics
    const totalJobs = jobs.length;
    const doneJobs = jobs.filter(job => job.status === "DONE").length;
    const failedJobs = jobs.filter(job => job.status === "FAILED").length;
    const pendingJobs = jobs.filter(job => job.status === "PENDING").length;

    return (
        <div style={{ 
            padding: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ 
                    fontSize: '2rem', 
                    marginBottom: '10px',
                    color: '#1a202c'
                }}>
                    Live Job Dashboard
                </h1>
                <div style={{ 
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    backgroundColor: connectionState === 'connected' ? '#d4edda' : '#f8d7da',
                    color: connectionState === 'connected' ? '#155724' : '#721c24'
                }}>
                    {connectionState === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
                </div>
            </div>

            {/* Statistics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: '#f7fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '8px' }}>
                        Total Jobs
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2d3748' }}>
                        {totalJobs}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    border: '1px solid #86efac'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '8px' }}>
                        Completed
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>
                        {doneJobs}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    border: '1px solid #fca5a5'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#991b1b', marginBottom: '8px' }}>
                        Failed
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#dc2626' }}>
                        {failedJobs}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: '#fffbeb',
                    borderRadius: '12px',
                    border: '1px solid #fcd34d'
                }}>
                    <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '8px' }}>
                        Pending
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706' }}>
                        {pendingJobs}
                    </div>
                </div>
            </div>

            {/* Jobs Table */}
            {jobs.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: '#f7fafc',
                    borderRadius: '12px',
                    color: '#718096'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                    <p style={{ fontSize: '1.1rem' }}>No jobs found for this user.</p>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <table style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f7fafc' }}>
                                <th style={headerStyle}>ID</th>
                                <th style={headerStyle}>Title</th>
                                <th style={headerStyle}>Description</th>
                                <th style={headerStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr 
                                    key={job.id}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}
                                >
                                    <td style={cellStyle}>{job.id}</td>
                                    <td style={{...cellStyle, fontWeight: '600'}}>{job.title}</td>
                                    <td style={cellStyle}>{job.description}</td>
                                    <td style={cellStyle}>
                                        <span style={getStatusStyle(job.status)}>
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

// Style constants
const headerStyle = {
    padding: '16px',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '2px solid #e2e8f0'
};

const cellStyle = {
    padding: '16px',
    fontSize: '0.95rem',
    color: '#2d3748',
    borderBottom: '1px solid #e2e8f0'
};

const getStatusStyle = (status) => {
    const baseStyle = {
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'inline-block'
    };

    switch (status) {
        case 'DONE':
            return {
                ...baseStyle,
                backgroundColor: '#d1fae5',
                color: '#065f46'
            };
        case 'FAILED':
            return {
                ...baseStyle,
                backgroundColor: '#fee2e2',
                color: '#991b1b'
            };
        case 'PENDING':
            return {
                ...baseStyle,
                backgroundColor: '#fef3c7',
                color: '#92400e'
            };
        case 'RUNNING':
            return {
                ...baseStyle,
                backgroundColor: '#dbeafe',
                color: '#1e40af'
            };
        default:
            return {
                ...baseStyle,
                backgroundColor: '#f3f4f6',
                color: '#374151'
            };
    }
};

export default JobDashboard;