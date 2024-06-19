import React, { useState } from "react";
import "../ManagerLayout/CommitmentPaper.css";
const CommitmentPaper = () => {
  const [paper, setPaper] = useState("");
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", requestDate: "2023-06-15" },
    { id: 2, name: "Jane Smith", requestDate: "2023-06-17" },
    // Add more customers as needed
  ]);

  const handleSave = () => {
    // Logic to save commitment paper
    console.log("Commitment Paper:", paper);
  };

  return (
    <div>
      <h1>Commitment Paper</h1>
      <div className="mb-3">
        <label className="form-label">Commitment Paper Details</label>
        <input
          type="text"
          className="form-control"
          value={paper}
          onChange={(e) => setPaper(e.target.value)}
        />
      </div>
      <button className="btn btn-commit" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CommitmentPaper;
