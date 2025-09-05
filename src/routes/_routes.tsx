import App from "../App";
import { __routes__ } from "../constants/routes";

export interface RouteType {
  path: string;
  element: React.JSX.Element;
  withLayout?: boolean;
}

export const privateRoutes: RouteType[] = [
  {
    path: __routes__.Dashboard,
    element: <App />,
    withLayout: true,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: __routes__.Auth.Login,
    element: <></>,
  },
];
