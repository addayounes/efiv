import Loading from "../pages/loading";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/utils";
import { __routes__ } from "../constants/routes";

interface PrivateRouteProps {
  Element: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Element }) => {
  const authState = useAppSelector((state) => state.auth);

  const isAuth = authState.isAuth;
  const isLoading = authState.isLoading;

  if (isLoading) return <Loading />;

  return isAuth ? Element : <Navigate to={__routes__.Auth.Login} />;
};

export default PrivateRoute;
