import Dashboard from "../pages/dashboard";
import { __routes__ } from "../constants/routes";
import Login from "../pages/auth/login";

export interface RouteType {
  path: string;
  element: React.JSX.Element;
  withLayout?: boolean;
}

export const privateRoutes: RouteType[] = [
  {
    path: __routes__.Dashboard,
    element: <Dashboard />,
    withLayout: true,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: __routes__.Auth.Login,
    element: <Login />,
  },
];
