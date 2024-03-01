import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, List } from "antd";

const Task = ({ tasks, title, description, onDelete, onEdit, key }) => {
  return (
    <>
      <List itemLayout="horizontal" dataSource={(title, description)}>
        {tasks.map((item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=Bandit`}
                />
              }
              title={<a href="https://ant.design">{item?.title}</a>}
              description={item?.description}
            />
            <EditOutlined
              style={{ color: "#8458B3", fontSize: "25px", width: "1.5em" }}
              onClick={() => onEdit(index)}
            />
            <DeleteOutlined
              style={{ color: "#8458B3", fontSize: "25px" }}
              onClick={() => onDelete(index)}
            />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Task;
