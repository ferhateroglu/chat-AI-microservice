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

const Layout = () => {
  return (
    <>
      <Navbar />
      <TopBar/>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
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
const protectedRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Login />,
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
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/likes",
    element: <Likes />,
  },
  {
    path: "/story",
    element: <Story />,
  },
]);

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={ currentUser ? router : protectedRouter} />
      </div>
    </div>
  );
}

export default App;
