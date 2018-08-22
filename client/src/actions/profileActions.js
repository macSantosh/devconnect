import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_ERRORS
} from "./types";

//get profile for logged in user

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile after logout
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};

//save profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("api/profile", profileData)
    .then(res => {
      //update profile state, dispatch get profile action
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      //dispatch error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
