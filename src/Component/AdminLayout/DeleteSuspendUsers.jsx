import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminLayout/DeleteSuspendUsers.css";
import { getAllAccounts } from "../../utils/getAllAccounts"; // Adjust path as needed
import { getAccountStatusMeaning } from "../../utils/getStatusMeaning";
import { changeAccountStatus } from "../../utils/changeAccountStatus"; // Adjust path as needed
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const DeleteSuspendUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const accounts = await getAllAccounts();
      setUsers(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    const account = handleSession(navigate);
    if (!account) {
      navigate(`/login`);
    }
    if (checkRole(account.accountId) != 5 || checkRole(account.accountId) != 6){
      navigate(`/nopermission`);
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 2 : 1; // Toggle between 1 (active) and 2 (blocked)
      const confirmed = window.confirm(`Are you sure you want to ${currentStatus === 1 ? "block" : "unblock"} this user?`);

      if (confirmed) {
        await changeAccountStatus(userId, newStatus);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.accountId === userId ? { ...user, accountStatus: newStatus } : user
          )
        );
        console.log(`User status updated for ID ${userId}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

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
          Chặn Tài Khoản Người Dùng
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">User Id</th>
                <th className="py-4 px-4 text-center align-middle">Tên</th>
                <th className="py-4 px-4 text-center align-middle">Email</th>
                <th className="py-4 px-4 text-center align-middle">Số Điện Thoại</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.accountId} className={`hover:bg-gray-100 ${user.accountStatus === 2 ? "bg-red-100" : (user.accountStatus === 1 ? "bg-green-100" : "")}`}>
                  <td className="py-4 px-4 text-center align-middle">{user.accountId}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.displayName}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email || "No Email"}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.phone || "No Phone"}</td>
                  <td className="py-4 px-4 text-center align-middle">{getAccountStatusMeaning(user.accountStatus)}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => toggleUserStatus(user.accountId, user.accountStatus)}
                      className={`${user.accountStatus === 1 ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                      {user.accountStatus === 1 ? "Block User" : "Unblock User"}
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
