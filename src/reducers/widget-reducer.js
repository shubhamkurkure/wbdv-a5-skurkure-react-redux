const initialState = {
  widgets: [
    { title: "Topic 1", _id: "123", type: "testType1", text: "testText1" },
    { title: "Topic 2", _id: "234", type: "testType2", text: "testText2" },
    { title: "Topic 3", _id: "345", type: "testType3", text: "testText3" },
  ],
};

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_WIDGET":
      const newStateCreated = {
        ...state,
        widgets: [...state.widgets, action.widget],
      };
      return newStateCreated;

    case "DELETE_WIDGET":
      const newStateDeleted = {
        widgets: state.widgets.filter((w) => {
          if (w.id !== action.widgetToDelete.id) {
            return true;
          } else {
            return false;
          }
        }),
      };
      return newStateDeleted;

    case "UPDATE_WIDGET":
      return {
        widgets: state.widgets.map((w) => {
          if (w.id === action.widgetToUpdate.id) {
            return action.widgetToUpdate;
          } else {
            return w;
          }
        }),
      };

    case "FIND_WIDGETS_FOR_TOPIC":
      return {
        widgets: action.widgets,
      };

    case "FIND_ALL_WIDGETS":
      return state;

    case "FIND_WIDGET":
      return state;

    default:
      return state;
  }
};

export default widgetReducer;
