import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "47d7b565fdd65c952a1e",
      clientSecret: "2757d9ba664b48957e47ba8a8f0e5ca5ab520da1",
      count: 5, //count of repo we  want
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientid, clientSecret } = this.state;

    //TODO: WE SHOULD NOT UPDATE STATE IN COMPONENT_DID_MOUNT
    //SANTOSH, I SHOULD USE REDUX TO CALL EXTERNAL SERVICE TO UPADATE STATE. I WILL GET MEMORY LEACK ERROR
    fetch(
      `https://api.github.com/users/${username}/repos?client_id=${clientid}&client_secret=${clientSecret}&sort=${sort}&page=1&per_page=${count}&`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(JSON.stringify(data));
        //if (this.refs.myref) {
        this.setState({ repos: data });
        //}
      })
      .catch(err => console.log("cannot get github repo " + err));
  }
  render() {
    const { repos } = this.state;
    const repoitems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>

          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>

            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>

            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest github repos</h3>
        {repoitems}
      </div>
    );
  }
}

ProfileGit.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGit;
