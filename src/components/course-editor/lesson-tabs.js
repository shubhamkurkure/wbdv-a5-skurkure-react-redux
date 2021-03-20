import React, { useEffect } from "react";
import { connect } from "react-redux";
import EditableItem from "../editable-item";
import { useParams } from "react-router-dom";
import lessonService from "../../services/lesson-service";

const LessonTabs = ({
  lessons = [],
  findLessonsForModule,
  createLessonForModule,
  updateLesson,
  deleteLesson,
}) => {
  const { layout, courseId, moduleId, lessonId } = useParams();

  useEffect(() => {
    if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
      findLessonsForModule(moduleId);
    }
  }, [moduleId]);

  return (
    <div>
      <h2>Lesson Tabs</h2>
      <ul className="nav nav-pills wbdv-editor-nav-pills lesson-tabs-editable-item">
        {lessons.map((lesson) => (
          <li className="nav-item">
            <EditableItem
              to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
              item={lesson}
              updateItem={updateLesson}
              deleteItem={deleteLesson}
              active={lesson._id === lessonId}
            />
          </li>
        ))}
        <li
          onClick={() => createLessonForModule(moduleId)}
          className="ml-2 fa fa-plus"
          style={{ float: "right" }}
        />
      </ul>
    </div>
  );
};

const stpm = (state) => ({
  lessons: state.lessonReducer.lessons,
});
const dtpm = (dispatch) => ({
  findLessonsForModule: (moduleId) => {
    lessonService.findLessonsForModule(moduleId).then((lessons) =>
      dispatch({
        type: "FIND_LESSONS",
        lessons,
      })
    );
  },
  createLessonForModule: (moduleId) => {
    lessonService
      .createLessonForModule(moduleId, { title: "New Lesson" })
      .then((lesson) =>
        dispatch({
          type: "CREATE_LESSON",
          lesson,
        })
      );
  },
  updateLesson: (lesson) =>
    lessonService.updateLesson(lesson._id, lesson).then((status) =>
      dispatch({
        type: "UPDATE_LESSON",
        updatedLesson: lesson,
      })
    ),
  deleteLesson: (lessonToDelete) => {
    lessonService
      .deleteLesson(lessonToDelete._id)
      .then((status) =>
        dispatch({ type: "DELETE_LESSON", deleteItem: lessonToDelete })
      );
  },
});

export default connect(stpm, dtpm)(LessonTabs);
