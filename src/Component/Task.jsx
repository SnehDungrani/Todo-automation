import { QuestionCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Popconfirm } from "antd";
import Badge from "./Badge";

const Task = ({ tasks, onDelete, onEdit }) => {
  const [selectedType, setSelectedType] = useState("current");
  const [currentTasks, setCurrentTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(() => {
    setCurrentTasks(tasks.filter((item) => item.value.type === "current"));
    setDailyTasks(tasks.filter((item) => item.value.type === "daily"));
  }, [tasks]);

  const filteredTasks = selectedType === "current" ? currentTasks : dailyTasks;

  return (
    <>
      <menu id="tabs">
        <li>
          <Button onClick={() => setSelectedType("current")}>
            Current Todos
          </Button>
          <Badge caption={currentTasks.length} />
        </li>
        <li>
          <Button onClick={() => setSelectedType("daily")}>Daily Todos</Button>
          <Badge caption={dailyTasks.length} />
        </li>
      </menu>

      <List itemLayout="horizontal" dataSource={filteredTasks}>
        {filteredTasks.map((item, index) => (
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
              cancelText="No"
              okText="Yes"
              onConfirm={() => onDelete(item)}
            >
              <DeleteOutlined style={{ color: "#FF0000", fontSize: "25px" }} />
            </Popconfirm>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Task;
