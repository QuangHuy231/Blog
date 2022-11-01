import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Single from "./views/Single";
import Create from "./views/Create";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Fragment } from "react";

import "./styles.scss";
import Update from "./views/Update";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
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
        path: "/posts/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Create />,
      },
      {
        path: "/update",
        element: <Update />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
