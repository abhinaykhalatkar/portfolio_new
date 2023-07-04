
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import NotFound404 from "../Pages/NotFound404/NotFound404";


const routeMap = () => {
  return [
    {
      path: '/',
      element:<HomePage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '*',
      element: <NotFound404/>
    }
  ];
};

export default routeMap;
