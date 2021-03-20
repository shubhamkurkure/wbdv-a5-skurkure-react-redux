import React from "react";
import CourseRow from "./course-row";
import { Link } from "react-router-dom";

export default class CourseTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br />
        <div className="container round-corners">
          <table className="table table-hover table-borderless responsive">
            <thead>
              <tr>
                <th scope="col" className="fa-2x">
                  Title
                </th>
                <th scope="col" className="fa-2x d-none d-sm-table-cell">
                  Owned By
                </th>
                <th scope="col" className="fa-2x d-none d-lg-table-cell">
                  Last Modified
                </th>
                <th scope="col">
                  <i className=" mx-2 fa fa-2x fa-folder" />
                  <i className="mx-2 fas fa-2x fa-sort-amount-up" />
                  <Link to="/courses/grid">
                    <i className="fas fa-2x fa-th" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.courses.map((course, idx) => (
                <CourseRow
                  deleteCourse={this.props.deleteCourse}
                  updateCourse={this.props.updateCourse}
                  key={course._id}
                  course={course}
                  title={course.title}
                  owner={course.owner}
                  lastModified={course.lastModified}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
