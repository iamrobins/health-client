import { userEnum } from "../enums";
import { User } from "interfaces";

export const userAdd = (payload: User) => (dispatch: any) => {
  try {
    dispatch({ type: userEnum.USER_PROFILE_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: userEnum.USER_PROFILE_FAIL, payload: null });
  }
};
