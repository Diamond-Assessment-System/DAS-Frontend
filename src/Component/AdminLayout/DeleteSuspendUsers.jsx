import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../AdminLayout/DeleteSuspendUsers.css";
import { getAllAccounts } from "../../utils/getAllAccounts"; // Adjust path as needed
import { getAccountStatusMeaning } from "../../utils/getStatusMeaning";
import { changeAccountStatus } from "../../utils/changeAccountStatus"; // Adjust path as needed
import Spinner from "../Spinner/Spinner";

const DeleteSuspendUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState("");

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
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    const confirmed = window.confirm(`Are you sure you want to ${currentStatus === 1 ? "block" : "unblock"} this user?`);

    if (confirmed) {
      if (newStatus === 2) {
        setSelectedUser(userId);
        setShowModal(true);
      } else {
        await updateUserStatus(userId, newStatus, "");
      }
    }
  };

  const updateUserStatus = async (userId, status, reason) => {
    try {
      const requestBody = JSON.stringify(reason);
      await changeAccountStatus(userId, status, requestBody);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.accountId === userId ? { ...user, accountStatus: status, blockReason: reason } : user
        )
      );
      console.log(`User status updated for ID ${userId}`);
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleBlockSubmit = async () => {
    await updateUserStatus(selectedUser, 2, blockReason);
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập Lý Do Chặn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="blockReason">
              <Form.Label>Lý Do</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleBlockSubmit}>
            Chặn Người Dùng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteSuspendUsers;
