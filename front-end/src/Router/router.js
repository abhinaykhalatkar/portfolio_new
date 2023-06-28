import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import { BrowserRouter,Router, Routes, Route } from 'react-router-dom';
import NavigationMenu from "../Components/NavBar";

function RouterComponent() {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default RouterComponent;
