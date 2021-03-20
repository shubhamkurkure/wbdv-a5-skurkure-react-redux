import React from "react";
import CourseTable from "../course-table/course-table";
import CourseGrid from "../course-grid/course-grid";
import { Route, useParams } from "react-router-dom";
import courseService, {
  findAllCourses,
  deleteCourse,
} from "../../services/course-service";
import CourseManagerNavbar from "./course-manager-navbar";

class CourseManager extends React.Component {
  initialSate = {
    title: "",
    owner: "me",
    lastModified: " ",
  };

  state = {
    courses: [],
    tempCourse: this.initialSate,
  };

  componentDidMount = () => {
    courseService
      .findAllCourses()
      .then((courses) => this.setState({ courses }));
  };

  addCourse = () => {
    const newCourse = this.state.tempCourse;

    courseService.createCourse(newCourse).then((course) =>
      this.setState((prevState) => ({
        ...prevState,
        courses: [...prevState.courses, course],
      }))
    );

    this.setState({ tempCourse: { title: "" } });
  };

  deleteCourse = (courseToDelete) => {
    deleteCourse(courseToDelete._id).then((status) => {
      this.setState((prevState) => ({
        ...prevState,
        courses: prevState.courses.filter(
          (course) => course !== courseToDelete
        ),
      }));
    });
  };

  editCourse = (courseToEdit) => {
    const selected = this.state.courses.filter(
      (course) => course === courseToEdit
    );
  };

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course).then((status) =>
      this.setState((prevState) => ({
        ...prevState,
        courses: prevState.courses.map((c) =>
          c._id === course._id ? course : c
        ),
      }))
    );
  };

  deleteAllCourses = () => {
    this.state.courses.map((course, idx) => {
      this.deleteCourse(course);
      console.log(course._id, "deleted");
    });
  };

  onCourseChange = (event) => {
    this.setState({
      tempCourse: {
        owner: "default",
        lastModified: "Never",
        title: event.target.value,
      },
    });
  };

  render() {
    return (
      <div>
        <h1>
          <b>Course Manager</b>
        </h1>
        <Route path="/courses/table" exact={true}>
          <CourseManagerNavbar
            addCourse={this.addCourse}
            onCourseChange={this.onCourseChange}
          />
          <CourseTable
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses}
          />
        </Route>
        <Route path="/courses/grid" exact={true}>
          <CourseManagerNavbar
            title={this.state.tempCourse.title}
            addCourse={this.addCourse}
            onCourseChange={this.onCourseChange}
          />
          <CourseGrid
            courses={this.state.courses}
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
          />
        </Route>
        <br />
      </div>
    );
  }
}

export default CourseManager;
