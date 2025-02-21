import React from "react";
import MainLayout from "./header/mainLayout";

const Login = React.lazy(() => import("./header/login"));
const Home = React.lazy(() => import("./header/home"));
const News = React.lazy(() => import("./views/news/news"));

const routes = [
  {
    path: "/home",
    name: "Home",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/news",
    name: "News",
    element: (
      <MainLayout>
        <News />
      </MainLayout>
    ),
  },
];

export default routes;
