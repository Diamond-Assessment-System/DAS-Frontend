import React from "react";

const ContentDatabase = () => {
  return (
    <div className="content-database-container">
      <h2>Modify Content and Resource Database</h2>
      <form className="content-database-form">
        <label>
          Resource Name:
          <input type="text" />
        </label>
        <label>
          Content:
          <textarea rows="4" />
        </label>
        <button type="submit">Update Content</button>
      </form>
    </div>
  );
};

export default ContentDatabase;
