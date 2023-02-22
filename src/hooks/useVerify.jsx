import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "services/apis";
import { userEnum } from "state";

function useVerify() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const scope = JSON.parse(window.localStorage.getItem("scope"));
      // setIsVerified(false);
      // if (!token) return window.location.replace("/");

      const auth = AuthService.getInstance();
      const profile = await auth.profile(scope);
      // if (!profile) return window.location.replace("/");

      if (profile) {
        dispatch({
          type: userEnum.USER_PROFILE_SUCCESS,
          payload: {
            firstName: profile.user.first_name,
            lastName: profile.user.last_name,
            email: profile.user.email,
            scope: profile.user.scope,
          },
        });
        setIsVerified(true);
      }
    };
    verifyUser();
  });

  return isVerified;
}
export default useVerify;
