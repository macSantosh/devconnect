import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  handleOnDeleteClick(expId) {
    //event.preventDefault();
    this.props.deleteExperience(expId);
  }

  render() {
    var experience = <div />;
    if (
      this.props.experience !== undefined &&
      Object.keys(this.props.experience).length > 0
    ) {
      experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              " Now "
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          {/**<td>{exp.description}</td>**/}
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={this.handleOnDeleteClick.bind(this, exp._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h4 className="mb-4"> Experiance credentials</h4>
        <table className="table table-light table-hover table-info ">
          <thead className="">
            <tr className="table-primary">
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
