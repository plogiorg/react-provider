import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../views/home";
import { Login, Signup } from "../views/login";
import { ProtectedRoute } from ".";
import ServiceComponent from "../views/services";
import Profile from "../views/profile";


type Route = {
  name: string;
  path: string;
  component: ReactNode;
  children?: Array<Route>;
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGIN_VERIFICATION: "/login/verify",
  DASHBOARD: "/home",
  SERVICES: "/home/services",
  PROFILE: "/home/profile",
};

const PUBLIC_ROUTES: Route[] = [
  {
    name: "Login",
    path: ROUTES.LOGIN,
    component: <Login />,
  },
  {
    name: "Signup",
    path: ROUTES.SIGNUP,
    component: <Signup />,
  },
];

const PROTECTED_ROUTES: Route[] = [
  {
    name: "Home",
    path: ROUTES.HOME,
    component: <Home />,
    children: [
      {
        name:"Services",
        path: ROUTES.SERVICES,
        component: <ServiceComponent/>
      },
      {
        name:"Profile",
        path: ROUTES.PROFILE,
        component: <Profile/>
      }
    ],
  },

];

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        {PROTECTED_ROUTES.map((route) => {
          if (route.children) {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={route.component}
              >
                {route.children.map((child) => (
                  <Route
                    key={child.name}
                    path={child.path}
                    element={child.component}
                  />
                ))}
              </Route>
            );
          }
          return (
            <Route
              key={route.name}
              path={route.path}
              element={route.component}
            />
          );
        })}
      </Route>
      {PUBLIC_ROUTES.map((route) => (
        <Route key={route.name} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default Router;
