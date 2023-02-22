import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "services/apis";
import { userEnum } from "state";

function useVerify() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = JSON.parse(window.localStorage.getItem("token"));
      // setIsVerified(false);
      // if (!token) return window.location.replace("/");

      const auth = AuthService.getInstance();
      const profile = await auth.profile(token);
      // if (!profile) return window.location.replace("/");

      if (profile) {
        dispatch({
          type: userEnum.USER_PROFILE_SUCCESS,
          payload: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
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
