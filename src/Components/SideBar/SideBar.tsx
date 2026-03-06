import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.scss";
import { Switch1 } from "../Switch/Switch";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { PrimeryBtn } from "../Buttons/Buttons";
import { MdFileDownload } from "react-icons/md";
import { useLocaleContext } from "../../i18n/LocaleContext";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

type SideBarProps = {
  passIsSidebarOpen: (isOpen: boolean) => void;
};

const SideBar = ({ passIsSidebarOpen }: SideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useThemeContext();
  const { setActiveIndex } = usePageAnimationContext();
  const { localizePath, t } = useLocaleContext();
  const navLinksData = [
    { name: t("nav.home"), link: "/" },
    { name: t("nav.about"), link: "/about" },
    { name: t("nav.skills"), link: "/skills" },
    { name: t("nav.projects"), link: "/projects" },
    { name: t("nav.contact"), link: "/contact" },
  ];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    passIsSidebarOpen(false);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      passIsSidebarOpen(next);
      return next;
    });
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSidebarOpen]);

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
      {isSidebarOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      ) : null}
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
                  to={localizePath(el.link)}
                  onClick={() => {
                    closeSidebar();
                    setActiveIndex(ind);
                  }}
                >
                  {el.name}
                </NavLink>
              );
            })}
          </div>
          <PrimeryBtn
            text={t("buttons.myResume")}
            path="/RESUME-Abhinay_Khalatkar.pdf"
            icon={<MdFileDownload />}
          />
          <div className="sidebar-language-switcher">
            <LanguageSwitcher compact />
          </div>
          <Switch1 />
        </nav>
      </motion.div>
    </div>
  );
};

export default SideBar;
