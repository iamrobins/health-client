import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

const initialState = {};

const middlewares: any = []; //Put middlewares here

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
