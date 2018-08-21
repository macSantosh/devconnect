import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, CLEAR_PROFILE } from "./types";

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
