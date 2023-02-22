import { combineReducers } from "redux";
import { demoReducer } from "./demoReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  demo: demoReducer,
  user: userReducer,
});

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case "RESET_STATE":
      return reducers(undefined, action);
    default:
      return reducers(state, action);
  }
};

// export default reducers;
export default rootReducer;
