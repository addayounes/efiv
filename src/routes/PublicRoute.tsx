import Loading from "@/pages/loading";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/utils";
import { __routes__ } from "@/constants/routes";

interface PublicRouteProps {
  Element: React.JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ Element }) => {
  const authState = useAppSelector((state) => state.auth);

  const isAuth = authState.isAuth;
  const isLoading = authState.isLoading;

  if (isLoading) return <Loading />;

  return isAuth ? <Navigate to={__routes__.Dashboard} /> : Element;
};

export default PublicRoute;
