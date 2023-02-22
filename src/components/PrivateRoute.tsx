import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthService } from "services/apis";
import { userEnum } from "state/enums";

export default PrivateRoute;

function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { user: authUser } = useSelector((x: any) => x.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      const token = JSON.parse(window.localStorage.getItem("token")!);
      if (!token) return window.location.replace("/");

      const auth = AuthService.getInstance();
      const profile = await auth.profile(token);
      if (!profile) return window.location.replace("/");
      dispatch({
        type: userEnum.USER_PROFILE_SUCCESS,
        payload: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        },
      });
    };
    verifyUser();
  }, []);

  if (!authUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (
    authUser &&
    (location.pathname === "/" || location.pathname === "/signup")
  ) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
}
