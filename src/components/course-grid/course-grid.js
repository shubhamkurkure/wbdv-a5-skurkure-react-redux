import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./course-card";

const CourseGrid = ({ courses, updateCourse, deleteCourse }) => {
  return (
    <div>
      <h1>Course Grid</h1>
      <div className="container">
        <div className="row mb-2">
          <span className="col d-none d-md-table-cell fa-2x">
            Recent Documents
          </span>
          <span className="col text-center d-none d-md-table-cell fa-2x">
            Owned by me
            <i className="fas fa-sort-down ml-1" />
          </span>
          <div className="col align-middle fa-2x">
            <Link to="/courses/table">
              <i className="fas fa-list fa-sm float-right px-3" />
            </Link>
            <a href="#">
              <i className="fas fa-sort-alpha-up float-right px-3" />
            </a>
            <a href="#">
              <i className="fas fa-folder float-right px-3" />
            </a>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
          {courses.map((course, idx) => (
            <CourseCard
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              key={course._id}
              course={course}
              title={course.title}
              owner={course.owner}
              lastModified={course.lastModified}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
