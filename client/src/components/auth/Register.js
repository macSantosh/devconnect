import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleOnSubmit(event) {
    event.preventDefault();
    console.log("on submit" + event.taget);
    this.setState({ errors: {} });

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //const { errors } = this.props.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    required
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.value}
                    onChange={this.handleOnChange}
                    autoComplete="username"
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.email}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                    autoComplete="new-password"
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleOnChange}
                    autoComplete="new-password"
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.password2}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

///good practice to define proptypes of all properties
Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register)); //withrouter is needed to pass the props.history to router, i did not like this option. i can use history in component. better to redicrect from componenet than action.
