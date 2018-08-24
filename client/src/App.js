import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperiance from "./components/add-credentials/AddExperiance";
import PrivateRoute from "./components/common/PrivateRoute";
import AddEducation from "./components/add-credentials/AddEducation";

if (localStorage.jwtAuthToken) {
  setAuthToken(localStorage.jwtAuthToken);
  //decode token and get user info and exp
  const decodedUser = jwt_decode(localStorage.jwtAuthToken);
  //set user and isAuthenticated by dispatchin set user action
  store.dispatch(setCurrentUser(decodedUser));
  // store.dispatch({
  //   type: SET_CURRENT_USER,
  //   payload: decodedUser
  // });

  const currentTimeinMs = Date.now() / 1000; //convert milliseconds to macroseconds

  if (decodedUser.exp < currentTimeinMs) {
    console.log("token expired");
    //logout user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
    //localStorage.removeItem("jwtAuthToken");
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experiance"
                  component={AddExperiance}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
