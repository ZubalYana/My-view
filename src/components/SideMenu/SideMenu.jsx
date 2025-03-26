import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import WhiteLogo from '../WhiteLogo/WhiteLogo';
import Home from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function SideMenu() {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home/> },
    { name: 'Achievements', path: '#', icon: <EmojiEventsIcon/> },
  ];

  return (
    <div className="SideMenu w-[19%] h-[100vh] bg-mainBlue p-8 z-50 xs:hidden lg:block">
      <WhiteLogo />
      <motion.div
        className="animatedLine bg-customWhite h-[1px] mt-2"
        initial={{ width: 0 }}
        animate={{ width: "116%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <ul className="SideMenu_navigationList text-customWhite mt-7">
        {menuItems.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path} className="SideMenu_navigationItem mt-3">
              <Link to={path} className="SideMenu_navigationLink relative flex items-center px-4 py-2 rounded-lg">
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 h-full w-full bg-customWhite/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {icon}{name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
