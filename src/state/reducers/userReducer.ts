import { User } from "interfaces";
import { userEnum } from "../enums";

export const userReducer = (
  state: { user: User | null } = { user: null },
  action: { type: userEnum; payload: User | null }
) => {
  switch (action.type) {
    case userEnum.USER_PROFILE_REQUEST:
      return { user: action.payload };
    case userEnum.USER_PROFILE_SUCCESS:
      return { user: action.payload };
    case userEnum.USER_PROFILE_FAIL:
      return { user: action.payload };
    default:
      return state;
  }
};
