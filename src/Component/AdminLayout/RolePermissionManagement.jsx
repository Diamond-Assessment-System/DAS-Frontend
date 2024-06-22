import { useState, useEffect } from "react";
import "../AdminLayout/RolePermissionManagement.css";

const RolePermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [newPermission, setNewPermission] = useState("");

  useEffect(() => {
    // Mock data fetching
    setRoles(["Admin", "User", "Editor"]);
    setPermissions(["Read", "Write", "Delete"]);
  }, []);

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  const handleAddPermission = () => {
    if (newPermission && !permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission]);
      setNewPermission("");
    }
  };

  const handleAssignPermission = (role, permission) => {
    console.log(`Assign ${permission} to ${role}`);
    // Implement the assignment logic here
  };

  return (
    <div className="role-permission-management">
      <h2>Role & Permission Management</h2>

      <div className="section">
        <h3>Roles</h3>
        <ul>
          {roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="New Role"
        />
        <button onClick={handleAddRole}>Add Role</button>
      </div>

      <div className="section">
        <h3>Permissions</h3>
        <ul>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="New Permission"
        />
        <button onClick={handleAddPermission}>Add Permission</button>
      </div>

      <div className="section">
        <h3>Assign Permissions to Roles</h3>
        {roles.map((role, index) => (
          <div key={index}>
            <h4>{role}</h4>
            {permissions.map((permission, pIndex) => (
              <button
                key={pIndex}
                onClick={() => handleAssignPermission(role, permission)}
              >
                {permission}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolePermissionManagement;
