import React, { useState } from "react";
// Import the CSS file for styling

const CreateManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Staff" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
  ]);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Staff");

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (newUserName && newUserEmail && newUserRole) {
      const newUser = {
        id: users.length + 1,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("Staff");
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    // Placeholder logic to delete user from backend API
    console.log(`Deleting user with ID ${userId}`);
  };

  return (
    <div className="manage-users-container">
      <h2>Create and Manage User Accounts</h2>
      <form className="manage-users-form" onSubmit={handleCreateUser}>
        <label>
          User Name:
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            required
          >
            <option value="Staff">Staff</option>
            <option value="Customer">Customer</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateManageUsers;
