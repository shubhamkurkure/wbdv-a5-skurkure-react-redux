import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import CourseService from "../../services/course-service";
import { connect, Provider } from "react-redux";

const CourseEditorNavbar = ({ course, findCourseById }) => {
  const { layout, courseId, moduleId, history } = useParams();

  useEffect(() => {
    findCourseById(courseId);
  }, [findCourseById, courseId]);

  return (
    <div>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid d-flex justify-content-between">
          <div className="nav-item">
            <Link to={`/courses/${layout}`}>
              <i className="fas fa-arrow-left wbdv-grey-color nav-link wbdv-btn-close" />
            </Link>
          </div>
          <a className="navbar-brand" href="#" style={{ alignItems: "center" }}>
            <span>{course.title}</span>
          </a>

          <div
            className="collapse navbar-collapse wbdv-nav-items"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 flex-row wbdv-nav-group">
              <li className="nav-item wbdv-nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const stpm = (state) => {
  return {
    course: state.courseReducer.course,
  };
};

const dtpm = (dispatch) => ({
  findCourseById: (courseId) => {
    CourseService.findCourseById(courseId).then((theCourse) =>
      dispatch({
        type: "FIND_COURSE",
        course: theCourse,
      })
    );
  },
});

export default connect(stpm, dtpm)(CourseEditorNavbar);
