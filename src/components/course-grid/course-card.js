import React, { useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({
  deleteCourse,
  updateCourse,
  course,
  lastModified,
  owner,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(course.title);

  const saveTitle = () => {
    setEditing(false);
    const newCourse = {
      ...course,
      title: newTitle,
    };
    updateCourse(newCourse);
  };

  return (
    <div className="col mb-4">
      <div className="card">
        <img
          src="https://source.unsplash.com/random"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          {!editing && (
            <Link
              to={`/courses/grid/edit/${course._id}`}
              className="card-title"
            >
              {course.title}
            </Link>
          )}

          {editing && (
            <input
              onChange={(event) => setNewTitle(event.target.value)}
              value={newTitle}
              className="form-control mb-2"
            />
          )}

          <p className="card-text">This is the Card View of the Courses</p>
        </div>
        <div className="card-footer">
          <div className="float-right">
            {editing && (
              <i onClick={() => saveTitle()} className="fas fa-check mr-2" />
            )}

            {editing && (
              <i
                onClick={() => {
                  setEditing(false);
                  deleteCourse(course);
                }}
                className="far fa-trash-alt"
              />
            )}

            {!editing && (
              <i onClick={() => setEditing(true)} className="fas fa-edit" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
