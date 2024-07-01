import React, { useState } from "react";
import "../AdminLayout/CreateManageUsers.css"; // Import the CSS file for styling

const CreateManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Staff" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "Staff"
  });

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditUserData({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser
          ? { ...user, name: editUserData.name, email: editUserData.email, role: editUserData.role }
          : user
      )
    );
    setEditingUser(null);
    setEditUserData({ name: "", email: "", role: "Staff" });
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    // Placeholder logic to delete user from backend API
    console.log(`Deleting user with ID ${userId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Manage User Accounts
        </h2>
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
                  <td className="py-4 px-4 text-center align-middle">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editUserData.name}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {editingUser === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editUserData.email}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {editingUser === user.id ? (
                      <select
                        name="role"
                        value={editUserData.role}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                      >
                        <option value="Staff">Staff</option>
                        <option value="Customer">Customer</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {editingUser === user.id ? (
                      <button
                        onClick={handleUpdateUser}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Update
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
