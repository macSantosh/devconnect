import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"; //if we want to redirect from redux we want withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperiance } from "../../actions/profileActions";

class AddExperiance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
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
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperiance(expData, this.props.history); //do withRouter to redirect
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
              <div className="display-4  text-center">Add Experiance</div>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleOnChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleOnChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="* Job Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleOnChange}
                  error={errors.location}
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
                    Current job
                  </lable>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  error={errors.description}
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

AddExperiance.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperiance: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { addExperiance }
)(withRouter(AddExperiance));
