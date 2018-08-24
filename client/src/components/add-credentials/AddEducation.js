import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"; //if we want to redirect from redux we want withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: "",
      disabled: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleOnSubmit(event) {
    //in handle submit
    event.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history); //do withRouter to redirect
  }
  handleOnCheck(event) {
    //in handle on check
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experiance">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <div className="display-4  text-center">Add Education</div>
              <p className="lead text-center">
                Add Degree or Education that you have had in the past or
                currently persuing
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="* School you attended"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleOnChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleOnChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleOnChange}
                  error={errors.fieldofstudy}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleOnChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.handleOnChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check-mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleOnCheck}
                    id="current"
                  />
                  <lable htmlFor="current" className="form-check-label">
                    Current school
                  </lable>
                </div>
                <TextAreaFieldGroup
                  placeholder="Course Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  error={errors.description}
                  info="tell us about program that you were in"
                />
                <input
                  type="submit"
                  value="submit"
                  className="submit brn btn-lg btn-block mt-4 btn-info"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
