import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleOnSubmit(event) {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    //dispatch create profile action
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div className="socialInput">
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.handleOnChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="YouTube channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.handleOnChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.handleOnChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.handleOnChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instaragram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.handleOnChange}
            error={errors.instragram}
          />
        </div>
      );
    }

    //select options for status
    const statusOptions = [
      { label: "  * Select Professional status", value: 0 },
      { label: "Developer", value: 1 },
      { label: "Sr Developer", value: 2 },
      { label: "Manager", value: 3 },
      { label: "Student", value: 4 },
      { label: "Other", value: 5 }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = Required fields</small>

              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleOnChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleOnChange}
                  error={errors.status}
                  options={statusOptions}
                  info="Select your career status"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleOnChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleOnChange}
                  error={errors.website}
                  info="Your Website link"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleOnChange}
                  error={errors.location}
                  info="City or city and state (e.g Charlotte, NC)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleOnChange}
                  error={errors.skills}
                  info="Please use comma saperated skills (e.g HTML, CSS, JAVA)"
                />

                <TextFieldGroup
                  placeholder="* Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleOnChange}
                  error={errors.githubusername}
                  info="Tell us your Github username"
                />

                <TextAreaFieldGroup
                  placeholder="* your shot biodata"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleOnChange}
                  error={errors.bio}
                  info="Tell us about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add social network Link
                  </button>{" "}
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}

                <input
                  className="btn btn-info btn-lg btn-block mt-4"
                  type="submit"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
