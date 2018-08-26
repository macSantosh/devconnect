import React, { Component } from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { getPostFeed } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostItem from "./PostItem";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }
  componentDidMount() {
    this.props.getPostFeed();
  }
  // componentWillReceiveProps(nextprops) {
  //   if (nextprops.post) {
  //     this.setState({ post: nextprops.post });
  //   }
  // }

  render() {
    const { posts, loading } = this.props.post;
    let postFeedData;
    if (loading || this.props.post == null) {
      postFeedData = <Spinner />;
    } else {
      postFeedData = posts.map(post => <PostItem key={post._id} post={post} />);
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div className="feed"> {postFeedData}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPostFeed: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    post: state.post
  };
};
export default connect(
  mapStateToProps,
  { getPostFeed }
)(Posts);
