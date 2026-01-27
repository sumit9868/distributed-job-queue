import React, { useState } from "react";
import axios from "axios";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitJob = async () => {
    const job = { title, description, status: "PENDING" };
    const res = await axios.post("http://localhost:8080/jobs/submit", job,
      {withCredentials: true}
    );
    console.log(`Job submitted with ID: ${res.data.id}`);
  };

  return (
    <div className="container">
      <h2>Submit Job</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={submitJob}>Submit</button>
    </div>
  );
}

export default JobForm;