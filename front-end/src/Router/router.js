import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import {createBrowserRouter} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/About",
        element: <AboutPage />,
    },
    {
        path: "*",
        element: <NotFound404 />,
    },
]);
export default router;