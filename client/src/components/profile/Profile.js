import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGit from "./ProfileGit";
import Spinner from "../common/Spinner";
import isEmpty from "../../utils/stringUtils";

import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      //gett he handle name from uri
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
    //if profile is null then redirect to page not found
  }
  componentWillReceiveProps(nextprops) {
    if (
      !nextprops.profile.loading &&
      Object.keys(nextprops.profile.profile).length < 1
    ) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            <div className="row">
              <div className="col-md-6">
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back to Profiles
                </Link>
              </div>
              <div className="col-md-6"> </div>
            </div>
            <div className="col-md-12">
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds profile={profile} />
              {!isEmpty(profile.githubusername) ? (
                <ProfileGit username={profile.githubusername} />
              ) : null}
            </div>
          </div>
        );
      }
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
