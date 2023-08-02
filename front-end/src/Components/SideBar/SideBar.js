import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.scss';
import { Switch1 } from '../Switch/Switch';

const SideBar = ({passIsSidebarOpen}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    console.log(isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen);
    console.log(!isSidebarOpen)

    passIsSidebarOpen(isSidebarOpen)
  };

  return (
    <>
      <div className='t-btn-container'>
      <button className="sidebar-toggle-btn" onClick={handleSidebarToggle}>
        ☰
      </button>
      </div>
      <motion.div
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <nav className='Nav'>
          <div className='NavMenu'>
            <NavLink className='NavLink' to='/' onClick={handleSidebarToggle}>
              HOME
            </NavLink>
            <NavLink className='NavLink' to='/about' onClick={handleSidebarToggle}>
              ABOUT
            </NavLink>
            <NavLink className='NavLink' to='/annual' onClick={handleSidebarToggle}>
              Other
            </NavLink>
            <Switch1 />
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default SideBar;
