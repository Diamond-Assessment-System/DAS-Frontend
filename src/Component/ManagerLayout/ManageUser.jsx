import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllAccounts } from "../../utils/getAllAccounts"; // Adjust path as needed
import { getAccountStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const accounts = await getAllAccounts();
      const filteredAccounts = accounts.filter(account => account.role === 1);
      setUsers(filteredAccounts);
      setFilteredUsers(filteredAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const newFilteredUsers = users.filter(user =>
      user.displayName.toLowerCase().includes(normalizedSearchQuery) ||
      user.phone?.toLowerCase().includes(normalizedSearchQuery)
    );
    setFilteredUsers(newFilteredUsers);
  }, [searchQuery, users]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Danh Sách Tài Khoản
        </h2>
        <input
          type="text"
          placeholder="Search by name or phone number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã Khách Hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên Khách Hàng</th>
                <th className="py-4 px-4 text-center align-middle">Email</th>
                <th className="py-4 px-4 text-center align-middle">Số Điện Thoại</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.accountId} className={`hover:bg-gray-100 ${user.accountStatus === 2 ? "bg-red-100" : (user.accountStatus === 1 ? "bg-green-100" : "")}`}>
                  <td className="py-4 px-4 text-center align-middle">{user.accountId}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.displayName}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email || "No Email"}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.phone || "No Phone"}</td>
                  <td className="py-4 px-4 text-center align-middle">{getAccountStatusMeaning(user.accountStatus)}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => window.location.href = `/user-details/${user.accountId}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      View Details
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

export default ManageUser;
