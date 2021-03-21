import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import widgetAPI from "../../services/widget-service";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";

const WidgetList = ({
  widgets = [],
  findWidgetsForTopic,
  createWidget,
  updateWidget,
  deleteWidget,
}) => {
  const [editingWidget, setEditingWidget] = useState({});
  const { topicId } = useParams();

  const wlDeleteWidget = (widget) => {
    deleteWidget(widget);
    setEditingWidget({});
  };

  const wlUpdateWidget = (widget) => {
    updateWidget(widget);
    setEditingWidget({});
    findWidgetsForTopic(topicId);
  };

  useEffect(() => {
    findWidgetsForTopic(topicId);
  }, [topicId, findWidgetsForTopic]);

  return (
    <div>
      <h2>
        Widgets
        <i
          className="ml-4 fas fa-plus"
          onClick={() => createWidget(topicId)}
        />
      </h2>

      <ul className="list-group">
        {widgets.map((w) => (
          <li key={w.id} className="list-group-item">
            <div>
              {editingWidget.id === w.id && (
                <>
                  <i
                    onClick={() => wlUpdateWidget(editingWidget)}
                    className="fas fa-2x fa-check float-right"
                  />
                  <i
                    onClick={() => wlDeleteWidget(w)}
                    className="d-inline fas fa-2x fa-trash float-right"
                  />
                </>
              )}
              {editingWidget.id !== w.id && (
                <>
                  <i
                    onClick={() => setEditingWidget(w)}
                    className="fas fa-2x fa-cog float-right"
                  />
                </>
              )}
            </div>

            <div>
              {w.type === "HEADING" && (
                <HeadingWidget
                  widget={w}
                  editing={editingWidget.id === w.id}
                  editingWidget={editingWidget}
                  setEditingWidget={setEditingWidget}
                />
              )}
              {w.type === "PARAGRAPH" && (
                <ParagraphWidget
                  widget={w}
                  editing={editingWidget.id === w.id}
                  editingWidget={editingWidget}
                  setEditingWidget={setEditingWidget}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const stpm = (state) => ({
  widgets: state.widgetReducer.widgets,
});

const dtpm = (dispatch) => ({
  findWidgetsForTopic: (topicId) => {
    widgetAPI.findWidgetsForTopic(topicId).then((theWidgets) =>
      dispatch({
        type: "FIND_WIDGETS_FOR_TOPIC",
        widgets: theWidgets,
      })
    );
  },

  createWidget: (topicId) => {
    widgetAPI
      .createWidget(topicId, {
        text: "New Widget",
        type: "HEADING",
        size: 1,
      })
      .then((theActualWidget) =>
        dispatch({
          type: "CREATE_WIDGET",
          widget: theActualWidget,
        })
      );
  },

  deleteWidget: (widgetToDelete) => {
    widgetAPI.deleteWidget(widgetToDelete.id).then((status) =>
      dispatch({
        type: "DELETE_WIDGET",
        widgetToDelete: widgetToDelete,
      })
    );
  },

  updateWidget: (widgetToUpdate) => {
    widgetAPI.updateWidget(widgetToUpdate).then((status) =>
      dispatch({
        type: "UPDATE_WIDGET",
        widgetToUpdate: widgetToUpdate,
      })
    );
  },
});

export default connect(stpm, dtpm)(WidgetList);
