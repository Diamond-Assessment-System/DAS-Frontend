import React, { useState } from "react";
<<<<<<< HEAD
// Import the CSS file for styling
=======
import "../AdminLayout/CreateManageUsers.css"; // Import the CSS file for styling
>>>>>>> f19943ee141e125b2c9a10a1247029a9261f6cc9

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
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Create and Manage User Accounts
        </h2>
        <form className="manage-users-form mb-4" onSubmit={handleCreateUser}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              User Name:
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
                className="block w-full mt-1 bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Email:
              <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
                className="block w-full mt-1 bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Role:
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                required
                className="block w-full mt-1 bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Staff">Staff</option>
                <option value="Customer">Customer</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">User Name</th>
                <th className="py-4 px-4 text-center align-middle">Email</th>
                <th className="py-4 px-4 text-center align-middle">Role</th>
                <th className="py-4 px-4 text-center align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center align-middle">{user.name}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.role}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
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

export default CreateManageUsers;
