import React, { useEffect, useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, List, Popconfirm } from "antd";
import { GrDatabase } from "react-icons/gr";
import Badge from "./Badge";

const Task = ({
  nTasks,
  dTasks,
  onDelete,
  onEdit,
  onFilter,
  filteredData,
  onDailyFilter,
  dailyFilteredData,
}) => {
  console.log(nTasks, dTasks);
  const [selectedType, setSelectedType] = useState("");

  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [normalTask, setNormalTask] = useState([]);

  const [filteredTask, setFilteredTask] = useState([]);

  useEffect(() => {
    setNormalTask(nTasks.filter((item) => item?.task_frequency === null));
    setAllDailyTasks(dTasks.filter((item) => item?.task_frequency !== null));
  }, [nTasks, dTasks]);

  console.log(allDailyTasks, normalTask);

  const normalTaskHandler = () => {
    setSelectedType("NORMAL");
    setFilteredTask(normalTask);
  };

  const dailyTaskHandler = () => {
    setSelectedType("DAILY");
    setFilteredTask(allDailyTasks);
  };

  const TodoTaskHandler = () => {
    onFilter("TODO");

    setFilteredTask(filteredData);
  };

  const InProgressTaskHandler = () => {
    onFilter("IN-PROGRESS");

    setFilteredTask(filteredData);
  };

  useEffect(() => {
    TodoTaskHandler();
    InProgressTaskHandler();
  }, []);

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

      {selectedType === "NORMAL" ? (
        <menu id="subtabs">
          <li>
            <Button type="dashed" onClick={normalTaskHandler}>
              All
            </Button>
          </li>
          <li>
            <Button type="dashed" onClick={TodoTaskHandler}>
              To-Do
            </Button>
          </li>
          <li>
            <Button type="dashed" onClick={InProgressTaskHandler}>
              In-Progress
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onFilter("DONE");
                setFilteredTask(filteredData);
              }}
            >
              Completed
            </Button>
          </li>
        </menu>
      ) : (
        <menu id="subtabs">
          <li>
            <Button type="dashed" onClick={dailyTaskHandler}>
              All
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onDailyFilter("Daily");
                setFilteredTask(dailyFilteredData);
              }}
            >
              Daily
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onDailyFilter("weekly");
                setFilteredTask(dailyFilteredData);
              }}
            >
              Weekly
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onDailyFilter("monthly");
                setFilteredTask(dailyFilteredData);
              }}
            >
              Monthly
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onDailyFilter("Quarterly");
                setFilteredTask(dailyFilteredData);
              }}
            >
              Quarterly
            </Button>
          </li>
          <li>
            <Button
              type="dashed"
              onClick={() => {
                onDailyFilter("yearly");
                setFilteredTask(dailyFilteredData);
              }}
            >
              Yearly
            </Button>
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
