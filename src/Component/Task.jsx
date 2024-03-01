import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

const Task = ({ title, description, onDelete, onEdit }) => {
  return (
    <div className="task">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task-buttons">
        <button onClick={onEdit}>
          <EditOutlined />
        </button>
        <br />
        <button onClick={onDelete}>
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
};

export default Task;
