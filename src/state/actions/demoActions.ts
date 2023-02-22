import { demoEnum } from "../enums";

export const demoOne = () => (dispatch: any) => {
  try {
    dispatch({ type: demoEnum.ONE });
  } catch (error) {
    console.log(error);
  }
};

export const demoTwo = () => (dispatch: any) => {
  try {
    dispatch({ type: demoEnum.TWO });
  } catch (error) {
    console.log(error);
  }
};
