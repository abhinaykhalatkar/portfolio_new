import React ,{useContext}from 'react';
import Navbar from './Components/NavBar/NavBar';
import RenderRoutes from './Context/router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { ThemeProvider } from './Context/ThemeContext/ThemeContext';

function App() {
  return (  
      <ThemeProvider>
        <Router>
          <Navbar/>
          <Routes>
            {RenderRoutes().map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;

