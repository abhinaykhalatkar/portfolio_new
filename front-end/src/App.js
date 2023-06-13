import { RouterProvider } from "react-router-dom";
import router from './Router/router';
import { Link } from "react-router-dom";
import './App.scss';

function App() {
  return (
    <div>
      {/* <Link to='/About'>Go to Aboutpage</Link> */}
      {/* <ul>
        <li>
          <Link to="../" relative="path">
            Home
          </Link>
        </li>
        <li>
          <Link to="../" relative="path">
            Home
          </Link>
        </li>
      </ul> */}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
