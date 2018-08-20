import { GET_ERRORS } from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      console.log(action.payload);
      console.log(action.payload.errors);
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
