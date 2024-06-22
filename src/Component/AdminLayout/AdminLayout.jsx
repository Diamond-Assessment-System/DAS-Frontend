import Sidebar from "../components/Sidebar";
const AdminLayout = ({ children }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
