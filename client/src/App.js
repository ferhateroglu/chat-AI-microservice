import { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Leaderboard,
  Likes,
  Story,
  NewStory,
} from "./pages";
import { Navbar, TopBar } from "./components";
import "./style.scss";
import { AuthContext } from "./context/authContext";
import { ProtectedRoute, AdminRoute } from "./context/ProtectedRoute ";

import axios from "axios";

const Layout = () => {
  return (
    <>
     <Navbar/>
     <TopBar/>
     <Outlet/>
    </>
  );
};

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element:(
           <Home />
        ),
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
        path: "/new-story",

        element: (
          <AdminRoute>
            <NewStory />
          </AdminRoute>
        ),
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
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);
const deneme = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/likes",
        element: (
          <ProtectedRoute>
            <Likes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new-story",

        element: (
          <ProtectedRoute>
            <AdminRoute>
              <NewStory />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/story/:slug",
        element: (
          <ProtectedRoute>
            <Story />
          </ProtectedRoute>
        ),
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

function App() {
  const { currentUser } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = currentUser
    ? "Barear " + currentUser.token
    : null;

  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={protectedRouter} />
      </div>
    </div>
  );
}

export default App;
