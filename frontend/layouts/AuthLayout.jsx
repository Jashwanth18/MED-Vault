import useUserStore from "../store/useUserStore";
import AuthErrorPage from "../src/components/ErrorPage";

const AuthLayout = ({ children, isAdminRoute = false }) => {
  const { accessToken, isAdmin } = useUserStore();
  if (!accessToken) {
    return <AuthErrorPage type={"not-logged-in"} redirectRoute={"/auth"} />;
  }

  if (isAdminRoute && !isAdmin) {
    return <AuthErrorPage type={"not-admin"} redirectRoute={"/home"} />;
  }

  return children;
};

export default AuthLayout;
