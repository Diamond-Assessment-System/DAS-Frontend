import { Route, Router, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AccountManagement from "./AccountManagement";
import RolePermissionManagement from "./RolePermissionManagement";
import ErrorReporting from "./ErrorReporting";
import SystemMaintenance from "./SystemMaintenance";
import SystemUpdate from "./SystemUpdate";
import DatabaseManagement from "./DatabaseManagement";

const AdminLayoutRouter = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/account" element={<AccountManagement />} />
          <Route path="/role" element={<RolePermissionManagement />} />
          <Route path="/error" element={<ErrorReporting />} />
          <Route path="/maintenance" element={<SystemMaintenance />} />
          <Route path="/update" element={<SystemUpdate />} />
          <Route path="/database" element={<DatabaseManagement />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};
export default AdminLayoutRouter;
