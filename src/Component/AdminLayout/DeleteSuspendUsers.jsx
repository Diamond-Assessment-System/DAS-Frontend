import React, { useState } from "react";
import "../AdminLayout/DeleteSuspendUsers.css"; 

const DeleteSuspendUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, email: "user1@example.com", displayName: "user1", status: 1},
    { id: 2, email: "user2@example.com", displayName: "user2", status: 1},
    { id: 3, email: "user3@example.com", displayName: "user3", status: 1},
  ]);

  const handleBlockUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 0 } : user
      )
    );
    console.log(`Blocking user with ID ${userId}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Block User Accounts
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">User Id</th>
                <th className="py-4 px-4 text-center align-middle">User Email</th>
                <th className="py-4 px-4 text-center align-middle">Display Name</th>
                <th className="py-4 px-4 text-center align-middle">Status</th>
                <th className="py-4 px-4 text-center align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-100 ${user.status === 0 ? "bg-red-100" : ""}`}>
                  <td className="py-4 px-4 text-center align-middle">{user.id}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.displayName}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.status}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={user.status === 0}
                    >
                      Block User
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

export default DeleteSuspendUsers;
