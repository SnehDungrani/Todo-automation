import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Task = ({ title, description, onDelete, onEdit }) => {
  return (
    <div className="task">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task-buttons">
        <button onClick={onEdit}>
          <FaEdit id="edit-icon" />
        </button>
        <button onClick={onDelete}>
          <MdDeleteForever id="delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default Task;
