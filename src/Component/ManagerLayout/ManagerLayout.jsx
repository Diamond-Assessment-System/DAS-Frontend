import React from 'react';
import NavbarManager from '../ManagerLayout/NavBarManager';
import { Outlet } from 'react-router-dom';

const ManagerLayout = () => {
  return (
    <div >
      <NavbarManager/>
          <Outlet />
        </div>
   
  );
}

export default ManagerLayout;
