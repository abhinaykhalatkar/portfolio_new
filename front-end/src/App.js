
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import HomePage from "./Pages/Home/Home";
// import AboutPage from "./Pages/About/About";
// import NotFound404 from "./Pages/NotFound404/NotFound404";
import Navbar from './Components/NavBar/NavBar';
import RenderRoutes from './Context/router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {RenderRoutes().map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;