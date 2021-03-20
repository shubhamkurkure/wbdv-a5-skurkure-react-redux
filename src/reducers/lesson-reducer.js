const initialState = {
  lessons: [],
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIND_LESSONS":
      return {
        ...state,
        lessons: action.lessons,
      };
    case "CREATE_LESSON":
      return {
        ...state,
        lessons: [...state.lessons, action.lesson],
      };
    case "DELETE_LESSON":
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => {
          return lesson._id !== action.deleteItem._id;
        }),
      };
    case "UPDATE_LESSON":
      return {
        ...state,
        lessons: state.lessons.map((lesson) => {
          if (lesson._id === action.updatedLesson._id) {
            return action.updatedLesson;
          } else {
            return lesson;
          }
        }),
      };
    default:
      return state;
  }
};

export default lessonReducer;
