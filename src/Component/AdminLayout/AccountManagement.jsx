import React, { useState, useEffect } from "react";
import "../AdminLayout/AccountManagement.css";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ username: "", email: "" });
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    // Mock data fetching
    setAccounts([
      { id: 1, username: "user1", email: "user1@example.com" },
      { id: 2, username: "user2", email: "user2@example.com" },
      { id: 3, username: "user3", email: "user3@example.com" },
    ]);
  }, []);

  const handleAddAccount = () => {
    if (newAccount.username && newAccount.email) {
      setAccounts([...accounts, { id: Date.now(), ...newAccount }]);
      setNewAccount({ username: "", email: "" });
    }
  };

  const handleEditAccount = (account) => {
    setEditAccount(account);
  };

  const handleUpdateAccount = () => {
    setAccounts(
      accounts.map((acc) => (acc.id === editAccount.id ? editAccount : acc))
    );
    setEditAccount(null);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  return (
    <div className="account-management">
      <h2>Account Management</h2>

      <div className="section">
        <h3>Accounts</h3>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              <span>
                {account.username} - {account.email}
              </span>
              <div>
                <button onClick={() => handleEditAccount(account)}>Edit</button>
                <button onClick={() => handleDeleteAccount(account.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>{editAccount ? "Edit Account" : "Add New Account"}</h3>
        <input
          type="text"
          value={editAccount ? editAccount.username : newAccount.username}
          onChange={(e) => {
            const value = e.target.value;
            editAccount
              ? setEditAccount({ ...editAccount, username: value })
              : setNewAccount({ ...newAccount, username: value });
          }}
          placeholder="Username"
        />
        <input
          type="email"
          value={editAccount ? editAccount.email : newAccount.email}
          onChange={(e) => {
            const value = e.target.value;
            editAccount
              ? setEditAccount({ ...editAccount, email: value })
              : setNewAccount({ ...newAccount, email: value });
          }}
          placeholder="Email"
        />
        <button onClick={editAccount ? handleUpdateAccount : handleAddAccount}>
          {editAccount ? "Update Account" : "Add Account"}
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
