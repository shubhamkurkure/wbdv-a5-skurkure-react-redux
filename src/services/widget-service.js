const API_URL = "https://hidden-plateau-92898.herokuapp.com/api";
// const API_URL = 'http://localhost:8080/api'

const findWidgetsForTopic = (topicId) =>
  fetch(`${API_URL}/topics/${topicId}/widgets`).then((response) =>
    response.json()
  );

const createWidget = (topicId, widget) =>
  fetch(`${API_URL}/topics/${topicId}/widgets`, {
    method: "POST",
    body: JSON.stringify(widget),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

const updateWidget = (widget) =>
  fetch(`${API_URL}/widgets/${widget.id}`, {
    method: "PUT",
    body: JSON.stringify(widget),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

const deleteWidget = (widgetId) =>
  fetch(`${API_URL}/widgets/${widgetId}`, {
    method: "DELETE",
  }).then((response) => response.json());

const widgetAPI = {
  findWidgetsForTopic,
  createWidget,
  deleteWidget,
  updateWidget,
};

export default widgetAPI;
