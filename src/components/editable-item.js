import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditableItem = ({ to, item, updateItem, deleteItem, active }) => {
  const [editing, setEditing] = useState(false);
  const [itemCache, setItemCache] = useState(item);
  return (
    <>
      {!editing && (
        <div className={`nav-link ${active ? "active" : ""}`}>
          <Link to={to} style={{ color: "black" }}>
            {item.title}
          </Link>
          <i onClick={() => setEditing(true)} className="fas fa-edit ml-2" />
        </div>
      )}
      {editing && (
        <>
          <input
            onChange={(e) =>
              setItemCache({ ...itemCache, title: e.target.value })
            }
            value={itemCache.title}
            style={{ marginRight: "5px" }}
          />
          <>
            <i
              onClick={() => {
                setEditing(false);
                updateItem(itemCache);
              }}
              className="fas fa-check"
              style={{ marginRight: "5px" }}
            />
            <i onClick={() => deleteItem(item)} className="fas fa-times" />
          </>
        </>
      )}
    </>
  );
};

export default EditableItem;
