import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

import axios from "axios";

//register user action
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login user action : get user token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      const { token } = res.data; //try to set it to res
      //set the auth token to local storage
      localStorage.setItem("jwtAuthToken", token);
      //set token to auth header for all future requests
      setAuthToken(token);
      //decode the auth token
      const decodedUser = jwt_decode(token);
      //dispatch action to set current user --below part can be exported to functin setCurrentUser
      dispatch({
        type: SET_CURRENT_USER,
        payload: decodedUser
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set logged in user
export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  };
};

//log out user
export const logoutUser = () => dispatch => {
  //remove token from localstoreage
  localStorage.removeItem("jwtAuthToken");
  //remove the auth header from future axios request
  setAuthToken(false);
  //set current user to {} and auth user false
  dispatch(setCurrentUser({}));
};
