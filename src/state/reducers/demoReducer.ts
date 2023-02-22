import { demoEnum } from "../enums";

export const demoReducer = (state = { demo: 0 }, action: any) => {
  switch (action.type) {
    case demoEnum.ONE:
      return { demo: 1 };
    case demoEnum.TWO:
      return { demo: 2 };
    default:
      return state;
  }
};
