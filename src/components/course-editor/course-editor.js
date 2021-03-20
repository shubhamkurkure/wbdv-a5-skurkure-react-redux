import React from "react";
import "./course-editor.css";
import { Link, useParams, useHistory } from "react-router-dom";
import moduleReducer from "../../reducers/module-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import widgetReducer from "../../reducers/widget-reducer";
import { combineReducers, createStore } from "redux";
import { connect, Provider } from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import topicReducer from "../../reducers/topic-reducer";
import courseReducer from "../../reducers/course-reducer";
import CourseEditorNavbar from "./course-editor-navbar";
import WidgetList from "../widgets/widget-list";

const reducer = combineReducers({
  moduleReducer,
  lessonReducer,
  topicReducer,
  courseReducer,
  widgetReducer,
});
const store = createStore(reducer);

const CourseEditor = ({ history, course, findCourseById }) => {
  const { layout, courseId, moduleId } = useParams();
  let mdiv;
  if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
    mdiv = (
      <div>
        <LessonTabs />
        <TopicPills />
        <WidgetList />
      </div>
    );
  }
  return (
    <Provider store={store}>
      <CourseEditorNavbar history={history} />
      <div className="row">
        <div className="col-3">
          <ModuleList />
        </div>
        <div className="col-9">{mdiv}</div>
      </div>
    </Provider>
  );
};

export default CourseEditor;
