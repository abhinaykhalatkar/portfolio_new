import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.scss";
import { Switch1 } from "../Switch/Switch";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { PrimeryBtn } from "../Buttons/Buttons";
import { MdFileDownload } from "react-icons/md";

type SideBarProps = {
  passIsSidebarOpen: (isOpen: boolean) => void;
};

const SideBar = ({ passIsSidebarOpen }: SideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useThemeContext();
  const { setActiveIndex } = usePageAnimationContext();
  const navLinksData = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "SKILLS", link: "/skills" },
    { name: "PROJECTS", link: "/projects" },
    { name: "CONTACT", link: "/contact" },
  ];
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      passIsSidebarOpen(next);
      return next;
    });
  };

  return (
    <div className="c-sidebar">
      <div className={`t-btn-container `}>
        <button
          className={`sidebar-toggle-btn ${
            darkTheme ? "s-color-white" : "s-color-black"
          }`}
          onClick={handleSidebarToggle}
        >
          ☰
        </button>
      </div>
      <motion.div
        className={`sidebar ${isSidebarOpen ? "open" : ""} ${
          darkTheme ? "s-back-color-b" : "s-color-white s-back-color"
        }`}
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <nav className="Nav">
          <div className="NavMenu">
            {navLinksData.map((el, ind) => {
              return (
                <NavLink
                  key={`sideNav ${ind}`}
                  className={`NavLink ${
                    darkTheme ? "s-color-white" : "s-color-black"
                  }`}
                  to={el.link}
                  onClick={() => {
                    handleSidebarToggle();
                    setActiveIndex(ind);
                  }}
                >
                  {el.name}
                </NavLink>
              );
            })}
          </div>
          <PrimeryBtn
            text="My Resume"
            path="/RESUME-Abhinay_Khalatkar.pdf"
            icon={<MdFileDownload />}
          />
          <Switch1 />
        </nav>
      </motion.div>
    </div>
  );
};

export default SideBar;
