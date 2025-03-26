import React from 'react';
import SideMenu from '../SideMenu/SideMenu';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="w-[100%] flex">
      <SideMenu />
      <div className="content-area w-[81%] xs:w-full lg:w-[81%]">
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
