import React ,{useState}from 'react';

import RenderRoutes from './Context/router';
import SideBar from './Components/SideBar/SideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { motion } from 'framer-motion';
import { ThemeProvider} from './Context/ThemeContext/ThemeContext';

function App() {
  const [isSidebarOpen,setIsSidebarOpen] =useState(false)
  function getIsSidebarOpen(val){
    console.log(isSidebarOpen)
    setIsSidebarOpen(!val)
  }

  return (  
      <ThemeProvider>
        <Router>
          <SideBar passIsSidebarOpen={getIsSidebarOpen}/>
          <motion.div
          className={`page-content ${isSidebarOpen ? 'page-content-collapsed' : ''}`}
          initial={false}
          animate={{ marginLeft: isSidebarOpen ? 250 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            {RenderRoutes().map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </motion.div>
        </Router>
      </ThemeProvider>
  );
}

export default App;

