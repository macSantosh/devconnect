import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  handleOnDeleteClick(eduId) {
    //event.preventDefault();
    this.props.deleteEducation(eduId);
  }

  render() {
    var education = <div />;
    if (
      this.props.education !== undefined &&
      Object.keys(this.props.education).length > 0
    ) {
      education = this.props.education.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
            {edu.to === null ? (
              " Now "
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          {/**<td>{edu.description}</td>**/}
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={this.handleOnDeleteClick.bind(this, edu._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h4 className="mb-4"> Education credentials</h4>
        <table className="table table-light table-hover table-info ">
          <thead className="">
            <tr className="table-primary">
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
