import React, { useState } from "react";

const HeadingWidget = ({
  widget,
  editing = false,
  editingWidget,
  setEditingWidget,
}) => {
  const [itemCache, setItemCache] = useState(widget);

  // const onChangeForText = (e) => {
  //   setItemCache({...itemCache})
  // }

  return (
    <>
      {editing && (
        <div style={{ width: "90%" }}>
          <select
            className="m-2 form-control"
            onChange={(e) =>
              setEditingWidget({ ...editingWidget, type: e.target.value })
            }
            value={editingWidget.type}
          >
            <option value={"HEADING"}>Heading</option>
            <option value={"PARAGRAPH"}>Paragraph</option>
          </select>
          <input
            className="m-2 form-control"
            onChange={(e) =>
              setEditingWidget({ ...editingWidget, text: e.target.value })
            }
            value={editingWidget.text}
          ></input>
          <select
            className="m-2 form-control"
            onChange={(e) =>
              setEditingWidget({
                ...editingWidget,
                size: parseInt(e.target.value),
              })
            }
            value={editingWidget.size}
          >
            <option value={1}>Heading 1</option>
            <option value={2}>Heading 2</option>
            <option value={3}>Heading 3</option>
            <option value={4}>Heading 4</option>
            <option value={5}>Heading 5</option>
            <option value={6}>Heading 6</option>
          </select>
        </div>
      )}
      {!editing && (
        <>
          {widget.size === 1 && <h1>{widget.text}</h1>}
          {widget.size === 2 && <h2>{widget.text}</h2>}
          {widget.size === 3 && <h3>{widget.text}</h3>}
          {widget.size === 4 && <h4>{widget.text}</h4>}
          {widget.size === 5 && <h5>{widget.text}</h5>}
          {widget.size === 6 && <h6>{widget.text}</h6>}
        </>
      )}
    </>
  );
};

export default HeadingWidget;
