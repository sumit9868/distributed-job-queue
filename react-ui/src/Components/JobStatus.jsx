import React, { useState } from "react";
import axios from "axios";

function JobStatus() {
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");

  const fetchStatus = async () => {
    const res = await axios.get(`http://localhost:8080/jobs/${jobId}/status`);
    setStatus(res.data);
  };

  return (
    <div className="container">
      <h2>Check Job Status</h2>
      <input value={jobId} onChange={e => setJobId(e.target.value)} placeholder="Job ID" />
      <button onClick={fetchStatus}>Check</button>
      {status && <p>Status: {status}</p>}
    </div>
  );
}

export default JobStatus;