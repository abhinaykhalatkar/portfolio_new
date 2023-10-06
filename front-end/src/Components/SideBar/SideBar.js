import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.scss";
import { Switch1 } from "../Switch/Switch";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { PrimeryBtn } from "../Buttons/Buttons";
import { MdFileDownload } from "react-icons/md";

const SideBar = ({ passIsSidebarOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const {setActiveIndex}=useContext(PageAnimationContext)
  const navLinksData = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "SKILLS", link: "/skills" },
    { name: "PROJECTS", link: "/projects" },
    { name: "CONTACT", link: "/contact" },
  ];
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    passIsSidebarOpen(isSidebarOpen);
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
                  onClick={()=>{handleSidebarToggle();
                    setActiveIndex(ind)
                  }}
                >
                  {el.name}
                </NavLink>
              );
            })}
          </div>
          <Link to="/RESUME-Abhinay_Khalatkar.pdf" target="_blank" download>
            <PrimeryBtn text="My Resume" icon={<MdFileDownload />}></PrimeryBtn>
          </Link>
          <Switch1 />
        </nav>
      </motion.div>
    </div>
  );
};

export default SideBar;
