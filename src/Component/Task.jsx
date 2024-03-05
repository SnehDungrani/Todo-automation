import { QuestionCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, List, Popconfirm } from "antd";

const Task = ({ tasks, title, description, onDelete, onEdit }) => {
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
              title={<a href="https://ant.design">{item?.value?.title}</a>}
              description={
                <>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.value?.description,
                    }}
                  ></p>
                  <i>created on {item.date}</i>
                </>
              }
            />
            <EditOutlined
              style={{ color: "#8458B3", fontSize: "25px", width: "1.5em" }}
              onClick={() => onEdit(item)}
            />

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              onConfirm={() => onDelete(item)}
            >
              <DeleteOutlined
                style={{ color: "#FF0000", fontSize: "25px" }}
                // onClick={() => onDelete(item)}
              />
            </Popconfirm>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Task;
