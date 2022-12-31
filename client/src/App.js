import { useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {Home, Login, Register,ForgotPassword,ResetPassword, Leaderboard ,Likes,Story} from "./pages";
import {Navbar, TopBar} from "./components";
import "./style.scss"
import { AuthContext } from "./context/authContext";
import axios from 'axios';



const Layout = () => {
  return (
    <>
      <Navbar />
      <TopBar/>
      <Outlet />
    </>
  );
};

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/likes",
        element: <Likes />,
      },
      {
        path: "/story/:slug",
        element: <Story />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  const { currentUser } = useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = currentUser ? ("Barear "+currentUser.token) : null;

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={ currentUser ?  protectedRouter : router} />
      </div>
    </div>
  );
}

export default App;
