import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/account" className="sidebarAdmin">
              Account Management
            </Link>
          </li>
          <li>
            <Link to="/role" className="sidebarAdmin">
              Role & Permission Management
            </Link>
          </li>
          <li>
            <Link to="/error" className="sidebarAdmin">
              Error Reporting
            </Link>
          </li>
          <li>
            <Link to="/maintenance" className="sidebarAdmin">
              System Maintenance
            </Link>
          </li>
          <li>
            <Link to="/update" className="sidebarAdmin">
              System Update
            </Link>
          </li>
          <li>
            <Link to="/database" className="sidebarAdmin">
              Database Management
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarAdmin;
