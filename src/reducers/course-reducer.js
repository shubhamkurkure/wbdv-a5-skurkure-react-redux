const initialState = {
  course: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIND_COURSE":
      return {
        ...state,
        course: action.course,
      };
    default:
      return state;
  }
};

export default courseReducer;
