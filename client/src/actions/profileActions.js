import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//get profile for logged in user

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {} //added by me to reset errors
      });
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
      //console.log(JSON.stringify(err));
      //dispatch error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add experiance
export const addExperiance = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experiance", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      //error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add experiance
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      //error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Delete Experiance
//NOTE -- I have spelling mistake with experience in backend
export const deleteExperience = expId => dispatch => {
  axios
    .delete(`/api/profile/experiance/${expId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      //error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Delete Education
export const deleteEducation = eduId => dispatch => {
  axios
    .delete(`/api/profile/education/${eduId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      //error
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete profile with user
export const deleteProfile = () => dispatch => {
  if (window.confirm("Are you sure, this can NOT be undone!!")) {
    axios
      .delete("api/profile")
      .then(ers => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        //dispatch error
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
