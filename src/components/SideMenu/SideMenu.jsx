import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import WhiteLogo from "../WhiteLogo/WhiteLogo";
import Home from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { ChevronDown } from "lucide-react";

export default function SideMenu() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home /> },
    {
      name: "Achievements",
      icon: <EmojiEventsIcon />,
      subItems: [
        { name: "Weekly", path: "/achievements-weekly" },
        { name: "Monthly", path: "/achievements-monthly" },
        { name: "Yearly", path: "/achievements-yearly" },
      ],
    },
  ];

  return (
    <div className="SideMenu w-[19%] h-[100vh] bg-[#5A00DA] text-[#F5F5F5] p-8 z-50 xs:hidden lg:block">
      <WhiteLogo />
      <motion.div
        className="animatedLine bg-white h-[1px] mt-2"
        initial={{ width: 0 }}
        animate={{ width: "116%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <ul className="SideMenu_navigationList text-white mt-7">
        {menuItems.map(({ name, path, icon, subItems }) => {
          const isParentActive = subItems?.some(({ path }) => location.pathname === path);
          return (
            <li key={name} className="mt-3">
              {subItems ? (
                <div>
                  <div
                    className={`relative flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      isParentActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                    onClick={() => setExpandedMenu(expandedMenu === name ? null : name)}
                  >
                    <span className="relative z-10 flex items-center gap-2 w-full">
                      {icon} {name}
                      <ChevronDown size={16} className={`ml-auto transition-transform ${expandedMenu === name ? "rotate-180" : ""}`} />
                    </span>
                  </div>
                  <motion.ul
                    className="pl-6 mt-2 overflow-hidden"
                    initial={false}
                    animate={{ height: expandedMenu === name ? "auto" : 0, opacity: expandedMenu === name ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {subItems.map(({ name, path }) => {
                      const isSubActive = location.pathname === path;
                      return (
                        <li key={path} className="mt-2">
                          <Link
                            to={path}
                            className={`relative flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                              isSubActive ? "bg-white/20" : "hover:bg-white/10"
                            }`}
                          >
                            <span className="relative z-10">{name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                </div>
              ) : (
                <Link
                  to={path}
                  className={`relative flex items-center px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === path ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">{icon} {name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
