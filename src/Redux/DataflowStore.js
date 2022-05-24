import { createStore, combineReducers } from "redux";

const textReducerState = {
  text: "",
};

const textReducer = (state = textReducerState, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      text: textReducer,
    })
  );
  return store;
};

export const setText = (text = "") => ({
  type: "SET_TEXT",
  text,
});
