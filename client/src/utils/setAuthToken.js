import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //if token available set token to axios header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //remove token from header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
