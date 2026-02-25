import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "@/components/layout";
import { useAuthState } from "@/hooks/use-auth-state";
import { privateRoutes, publicRoutes } from "./_routes";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  useAuthState();
  return (
    <ReactRoutes>
      {/* Authenticated routes with layout */}
      {privateRoutes.map((route, index) =>
        route.withLayout ? (
          <Route path="/" element={<PrivateRoute Element={<AppLayout />} />}>
            <Route path={route.path} element={route.element} key={index} />
          </Route>
        ) : (
          <Route path={route.path} element={route.element} key={index} />
        ),
      )}

      {/* Unauthenticated routes with no layout */}
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<PublicRoute Element={route.element} />}
        />
      ))}

      {/* TODO */}
      <Route path="*" element={<div>404 not found</div>} />
    </ReactRoutes>
  );
};

export default AppRoutes;
