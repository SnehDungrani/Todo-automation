import { QuestionCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Alert, Avatar, Button, List, Popconfirm } from "antd";
import { GrDatabase } from "react-icons/gr";
import Badge from "./Badge";

const Task = ({ tasks, onDelete, onEdit }) => {
  console.log(tasks);
  const [selectedType, setSelectedType] = useState("TODO");
  const [todoTask, setTodoTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [doneTask, setDoneTask] = useState([]);

  useEffect(() => {
    setTodoTask(tasks.filter((item) => item.status === "TODO"));
    setInProgressTask(tasks.filter((item) => item.status === "IN-PROGRESS"));
    setDailyTasks(tasks.filter((item) => item.status === "DAILY"));
    setDoneTask(tasks.filter((item) => item.status === "DONE"));
  }, [tasks]);

  let filteredTasks;

  if (selectedType === "TODO") {
    filteredTasks = todoTask;
  } else if (selectedType === "IN-PROGRESS") {
    filteredTasks = inProgressTask;
  } else if (selectedType === "DAILY") {
    filteredTasks = dailyTasks;
  } else if (selectedType === "DONE") {
    filteredTasks = doneTask;
  }

  return (
    <>
      <menu id="tabs">
        <li>
          <Button onClick={() => setSelectedType("TODO")}>Todos</Button>
          <Badge caption={todoTask.length} />
        </li>
        <li>
          <Button onClick={() => setSelectedType("IN-PROGRESS")}>
            Current Todos
          </Button>
          <Badge caption={inProgressTask.length} />
        </li>
        <li>
          <Button onClick={() => setSelectedType("DAILY")}>Daily Todos</Button>
          <Badge caption={dailyTasks.length} />
        </li>

        <li>
          <Button onClick={() => setSelectedType("DONE")}>Completed</Button>
          <Badge caption={doneTask.length} />
        </li>
      </menu>

      <List itemLayout="horizontal" dataSource={filteredTasks}>
        {filteredTasks.length <= 0 ? (
          <Alert
            type="info"
            message={
              <>
                <GrDatabase />
                <span> There is no task found.</span>
              </>
            }
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></Alert>
        ) : (
          filteredTasks.map((item, index) => (
            <List.Item
              key={item.id}
              style={{
                borderRadius: "15px",

                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 5px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item?.title}</a>}
                description={
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    ></p>
                    <i>created on {item.createdAt}</i>
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
                <DeleteOutlined
                  style={{ color: "#FF0000", fontSize: "25px" }}
                />
              </Popconfirm>
            </List.Item>
          ))
        )}
      </List>
    </>
  );
};

export default Task;
