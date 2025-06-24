import React from 'react';
import SideMenu from '../SideMenu/SideMenu';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="w-[100%] flex">
      <SideMenu />
      <div className="content-area w-[100%] p-3 bg-[#F5F5F5] lg:w-[81%] lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
