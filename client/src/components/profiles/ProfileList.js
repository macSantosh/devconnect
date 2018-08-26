import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class ProfileList extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profilesData;
    if (profiles === null || loading) {
      profilesData = <Spinner />;
    } else {
      if (profiles.length > 0) {
        //loop through profiles and get data
        profilesData = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profilesData = <div>No profiles found</div>;
      }
    }
    return (
      <div className="profile-list">
        {" "}
        <div className="container">
          <div className="row">
            <div className="col col-md-12">
              <div className="display-4 text-center">Developer Profiles</div>
              <p className="lead text-center">
                Browse and connect with Developers
              </p>
              {profilesData}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getProfiles }
)(ProfileList);
