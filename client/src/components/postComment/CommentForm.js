import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import PropTypes from "prop-types";

class CommentForm extends Component {
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
    const { postId } = this.props;

    const newComment = {
      text: this.state.text
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a Comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Comment here"
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

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
