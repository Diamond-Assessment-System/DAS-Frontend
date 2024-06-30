import React, { useState } from "react";
import "../AdminLayout/AssignRolesPermissions.css";

const AssignRolesPermissions = () => {
  const [users, setUsers] = useState([
    { id: 1, email: "user1@example.com", role: "Staff" },
    { id: 2, email: "user2@example.com", role: "Manager" },
    { id: 3, email: "user3@example.com", role: "Admin" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleAssignRole = (e) => {
    e.preventDefault();
    if (selectedUser && selectedRole) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        )
      );
      setSelectedUser(null);
      setSelectedRole("");
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
                <tr key={user.id}>
                  <td className="py-4 px-4 text-center align-middle">{user.email}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.role}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Assign Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <form className="assign-roles-form" onSubmit={handleAssignRole}>
            <h3 className="text-lg font-semibold text-gray-800 my-4">Assign Role to {selectedUser.email}</h3>
            <label className="block mb-2 text-gray-700">
              Role:
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </label>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Assign Role
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssignRolesPermissions;
