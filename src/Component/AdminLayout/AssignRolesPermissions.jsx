import React, { useState, useEffect } from "react";
import "../AdminLayout/AssignRolesPermissions.css";
import { getAllAccounts } from "../../utils/getAllAccounts";
import { getRoleMeaning } from "../../utils/getStatusMeaning";
import { changeAccountRole } from "../../utils/changeAccountRole";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const AssignRolesPermissions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const account = handleSession(navigate);
    if (!account) {
      navigate(`/login`);
    }
    if (checkRole(account.accountId) != 5 || checkRole(account.accountId) != 6){
      navigate(`/nopermission`);
    };
    
    const fetchUsers = async () => {
      try {
        const usersData = await getAllAccounts();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectChange = (e, accountId) => {
    const selectedRole = parseInt(e.target.value, 10);
    setSelectedRoles((prevState) => ({
      ...prevState,
      [accountId]: selectedRole,
    }));
  };

  const handleSubmit = async (accountId, displayName) => {
    const selectedRole = selectedRoles[accountId];
    if (selectedRole) {
        if (window.confirm("Bạn chắc chắn muốn thêm role này cho " + displayName + " ?")) {
        try {
          await changeAccountRole(accountId, selectedRole);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.accountId === accountId ? { ...user, role: selectedRole } : user
            )
          );
          alert('Role updated successfully');
        } catch (error) {
          console.error('Error changing user role:', error);
          alert('Failed to update role');
        }
      }
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Assign Roles and Permissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Name</th>
                <th className="py-4 px-4 text-center align-middle">Email</th>
                <th className="py-4 px-4 text-center align-middle">Phone</th>
                <th className="py-4 px-4 text-center align-middle">Current Role</th>
                <th className="py-4 px-4 text-center align-middle">New Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.accountId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center align-middle">{user.displayName}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email || "No email"}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.phone || "No phone"}</td>
                  <td className="py-4 px-4 text-center align-middle">{getRoleMeaning(user.role)}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <select
                        onChange={(e) => handleSelectChange(e, user.accountId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        value={selectedRoles[user.accountId] || ""}
                      >
                        <option value="" disabled hidden>Select Role</option>
                        <option value="1">Customer</option>
                        <option value="2">Consulting Staff</option>
                        <option value="3">Assessment Staff</option>
                        <option value="4">Manager</option>
                        <option value="5">Admin</option>
                      </select>
                      <button
                        onClick={() => handleSubmit(user.accountId, user.displayName)}
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
