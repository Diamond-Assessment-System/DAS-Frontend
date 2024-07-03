import React, { useState } from "react";
import "../AdminLayout/AssignRolesPermissions.css";

const AssignRolesPermissions = () => {
  const [users, setUsers] = useState([
    { id: 1, email: "user1@example.com", role: "Staff" },
    { id: 2, email: "user2@example.com", role: "Manager" },
    { id: 3, email: "user3@example.com", role: "Admin" },
  ]);

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleSelectChange = (e, userId) => {
    const selectedRole = e.target.value;
    setSelectedRoles((prevState) => ({
      ...prevState,
      [userId]: selectedRole,
    }));
  };

  const handleSubmit = (userId) => {
    const selectedRole = selectedRoles[userId];
    if (selectedRole) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: selectedRole } : user
        )
      );
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Assign Roles and Permissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">User Email</th>
                <th className="py-4 px-4 text-center align-middle">Current Role</th>
                <th className="py-4 px-4 text-center align-middle">New Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center align-middle">{user.email}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.role}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <select
                        onChange={(e) => handleSelectChange(e, user.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        value={selectedRoles[user.id] || ""}
                      >
                        <option value="" disabled hidden>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                      </select>
                      <button
                        onClick={() => handleSubmit(user.id)}
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignRolesPermissions;
