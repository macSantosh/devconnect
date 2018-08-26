import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import PropTypes from "prop-types";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.error !== null) {
      this.setState({ errors: nextprops.errors });
    }
  }
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOnSubmit(e) {
    e.preventDefault();
    const postData = {
      text: this.state.text
    };
    this.props.addPost(postData);
    this.setState({ text: "", errors: {} });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Post here"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleOnChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
