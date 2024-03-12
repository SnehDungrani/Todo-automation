import React, { useEffect, useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, List, Popconfirm } from "antd";
import { GrDatabase } from "react-icons/gr";
import Badge from "./Badge";

const Task = ({ nTasks, dTasks, onDelete, onEdit }) => {
  console.log(nTasks, dTasks);
  const [selectedType, setSelectedType] = useState("TODO");
  const [todoTask, setTodoTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [normalTask, setNormalTask] = useState([]);

  const [repeatTask, setRepeatTask] = useState({
    dailyTask: [],
    weeklyTask: [],
    monthlyTask: [],
    quarterlyTask: [],
    yearlyTask: [],
  });
  const [filteredTask, setFilteredTask] = useState([]);

  const { dailyTask, weeklyTask, monthlyTask, quarterlyTask, yearlyTask } =
    repeatTask;

  useEffect(() => {
    setNormalTask(nTasks.filter((item) => item?.task_frequency === null));
    setAllDailyTasks(dTasks.filter((item) => item?.task_frequency !== null));
  }, [nTasks, dTasks]);

  console.log(allDailyTasks, normalTask);

  function normalTaskHandler() {
    setSelectedType("NORMAL");
    setFilteredTask(normalTask);
  }

  function dailyTaskHandler() {
    setSelectedType("DAILY");
    setFilteredTask(allDailyTasks);
  }

  useEffect(() => {
    setTodoTask(normalTask.filter((item) => item.status === "TODO"));
    setInProgressTask(
      normalTask.filter((item) => item.status === "IN-PROGRESS")
    );
    setDoneTask(normalTask.filter((item) => item.status === "DONE"));
  }, [normalTask]);

  console.log(filteredTask);

  return (
    <>
      <menu id="tabs">
        <li>
          <Button onClick={normalTaskHandler}>Normal Task</Button>
          <Badge caption={normalTask.length} />
        </li>
        <li>
          <Button onClick={dailyTaskHandler}>Daily Task</Button>
          <Badge caption={allDailyTasks.length} />
        </li>
      </menu>
      {selectedType !== "" && (
        <menu id="subtabs">
          {selectedType === "DAILY" && (
            <>
              <li>
                <Button type="dashed" onClick={dailyTaskHandler}>
                  All
                </Button>
              </li>
            </>
          )}
          <li>
            {selectedType === "NORMAL" ? (
              <Button type="dashed" onClick={normalTaskHandler}>
                All
              </Button>
            ) : (
              <Button
                type="dashed"
                onClick={() => {
                  setRepeatTask({
                    dailyTask: dTasks.filter(
                      (item) => item?.task_frequency === "Daily"
                    ),
                  });

                  setFilteredTask(dailyTask);
                }}
              >
                Daily
              </Button>
            )}
          </li>
          <li>
            {selectedType === "NORMAL" ? (
              <Button type="dashed" onClick={() => setFilteredTask(todoTask)}>
                To-Do
              </Button>
            ) : (
              <Button
                type="dashed"
                onClick={() => {
                  setRepeatTask({
                    weeklyTask: dTasks.filter(
                      (item) => item?.task_frequency === "weekly"
                    ),
                  });

                  setFilteredTask(weeklyTask);
                }}
              >
                Weekly
              </Button>
            )}
          </li>
          {selectedType === "DAILY" && (
            <>
              <li>
                <Button
                  type="dashed"
                  onClick={() => {
                    setRepeatTask({
                      monthlyTask: dTasks.filter(
                        (item) => item?.task_frequency === "monthly"
                      ),
                    });

                    setFilteredTask(monthlyTask);
                  }}
                >
                  Monthly
                </Button>
              </li>
            </>
          )}
          <li>
            {selectedType === "NORMAL" ? (
              <Button
                type="dashed"
                onClick={() => setFilteredTask(inProgressTask)}
              >
                In-Progress
              </Button>
            ) : (
              <Button
                type="dashed"
                onClick={() => {
                  setRepeatTask({
                    quarterlyTask: dTasks.filter(
                      (item) => item?.task_frequency === "Quarterly"
                    ),
                  });

                  setFilteredTask(quarterlyTask);
                }}
              >
                Quarterly
              </Button>
            )}
          </li>

          <li>
            {selectedType === "NORMAL" ? (
              <Button type="dashed" onClick={() => setFilteredTask(doneTask)}>
                Completed
              </Button>
            ) : (
              <Button
                type="dashed"
                onClick={() => {
                  setRepeatTask({
                    yearlyTask: dTasks.filter(
                      (item) => item?.task_frequency === "yearly"
                    ),
                  });

                  setFilteredTask(yearlyTask);
                }}
              >
                Yearly
              </Button>
            )}
          </li>
        </menu>
      )}

      <List itemLayout="horizontal" dataSource={filteredTask}>
        {filteredTask?.length <= 0 ? (
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
          filteredTask?.map((item, index) => (
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
                onConfirm={() => onDelete(item, selectedType)}
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
