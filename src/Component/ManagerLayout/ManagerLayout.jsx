import React from "react";
import NavbarManager from "../ManagerLayout/NavBarManager";
import { Outlet } from "react-router-dom";
import useCheckRole from "../../utils/hookCheckRole";

const ManagerLayout = () => {
  useCheckRole([4, 6]);

  return (
    <div>
      <NavbarManager />
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
