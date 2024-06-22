import React, { useState } from "react";

const CommitmentPaper = () => {
  const [paper, setPaper] = useState("");

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
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CommitmentPaper;
