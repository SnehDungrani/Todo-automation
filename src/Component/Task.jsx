import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Spin, Alert, Avatar, Button, List, Popconfirm, Checkbox } from "antd";
import { GrDatabase } from "react-icons/gr";
import Badge from "./Badge";
import { apiGenerator } from "../util/functions";
import CONSTANTS from "../util/constant/CONSTANTS";
import useHttp from "../Hooks/use-http";
import { TaskContext } from "../store/task-context.jsx";

const Task = () => {
  const [selectedType, setSelectedType] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multipleId, setMultipleId] = useState([]);
  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [normalTask, setNormalTask] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  const API = useHttp();

  const {
    nTasks,
    dTasks,
    dailyFilteredData,
    filteredData,
    onDailyFilter,
    onDelete,
    onEdit,
    onFilter,
  } = useContext(TaskContext);

  useEffect(() => {
    setNormalTask(
      nTasks
        .filter(
          (item) =>
            item?.task_frequency === null || item?.task_frequency !== null
        )
        .sort((a, b) => a.updatedAt - b.updatedAt)
        .reverse()
    );
    setAllDailyTasks(
      dTasks
        .filter((item) => item?.task_frequency !== null)
        .sort((a, b) => a.updatedAt - b.updatedAt)
        .reverse()
    );
  }, [dTasks, nTasks]);

  useEffect(() => {
    if (selectedType === "NORMAL") {
      setFilteredTask(filteredData);
    } else if (selectedType === "DAILY") {
      setFilteredTask(dailyFilteredData);
    }
  }, [selectedType, filteredData, dailyFilteredData]);

  const normalTaskHandler = () => {
    setSelectedType("NORMAL");
    setFilteredTask(normalTask);
  };

  const dailyTaskHandler = () => {
    setSelectedType("DAILY");
    setFilteredTask(allDailyTasks);
  };

  const filterAllTasks = selectedType === "NORMAL" ? normalTask : allDailyTasks;

  useEffect(() => {
    setFilteredTask(filterAllTasks);
  }, [filterAllTasks]);

  const idHandler = useCallback(function idHandler(item) {
    setIsSelect(true);
    setMultipleId((prev) => {
      const updatedId = !prev[item.id];
      return { ...prev, [item.id]: updatedId };
    });
  }, []);

  const multipleDeleteHandler = async () => {
    const selectedTaskIds = Object.keys(multipleId).filter(
      (key) => multipleId[key]
    );
    const finalTaskIds = selectedTaskIds.join(",");

    if (finalTaskIds) {
      if (selectedType === "NORMAL") {
        const DELETE_API = apiGenerator(CONSTANTS.API.todo.bulkDelete, {
          id: finalTaskIds,
        });
        await API.sendRequest(
          DELETE_API,
          (res) => {
            if (res?.status === "success") {
              setLoading((pr) => !pr);
              window.location.reload();
            }
          },
          {},
          "Normal Multiple Task Deleted successfully"
        );
      } else {
        const DELETE_API = apiGenerator(CONSTANTS.API.repeatTodo.bulkDelete, {
          id: finalTaskIds,
        });
        await API.sendRequest(
          DELETE_API,
          (res) => {
            if (res?.status === "success") {
              setLoading((pr) => !pr);
              window.location.reload();
            }
          },
          {},
          "Daily Multiple Task Deleted successfully"
        );
      }
    } else {
      console.log("No tasks selected for deletion.");
    }
  };

  const onClickHandler = (isSelectedButton) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1700);
    if (isSelectedButton === "TODO") {
      onFilter("TODO");
    } else if (isSelectedButton === "IN-PROGRESS") {
      onFilter("IN-PROGRESS");
    } else if (isSelectedButton === "DONE") {
      onFilter("DONE");
    } else if (isSelectedButton === "Daily") {
      onDailyFilter("Daily");
    } else if (isSelectedButton === "weekly") {
      onDailyFilter("weekly");
    } else if (isSelectedButton === "monthly") {
      onDailyFilter("monthly");
    } else if (isSelectedButton === "Quarterly") {
      onDailyFilter("Quarterly");
    } else if (isSelectedButton === "yearly") {
      onDailyFilter("yearly");
    }
  };

  return (
    <>
      <menu id="tabs">
        <li>
          <Button onClick={() => setSelectedType("NORMAL")}>Normal Task</Button>
          <Badge caption={nTasks.length} />
        </li>
        <li>
          <Button onClick={() => setSelectedType("DAILY")}>Daily Task</Button>
          <Badge caption={dTasks.length} />
        </li>
      </menu>

      <menu id="subtabs">
        {selectedType === "NORMAL" && (
          <>
            <Button type="dashed" onClick={normalTaskHandler}>
              All
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("TODO")}>
              To-Do
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("IN-PROGRESS")}>
              In-Progress
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("DONE")}>
              Completed
            </Button>
            <Button
              type="default"
              onClick={() => {
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                multipleDeleteHandler();
              }}
              disabled={isSelect === false}
            >
              Delete Selected
            </Button>
          </>
        )}
        {selectedType !== "NORMAL" && (
          <>
            <Button type="dashed" onClick={dailyTaskHandler}>
              All
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("Daily")}>
              Daily
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("weekly")}>
              Weekly
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("monthly")}>
              Monthly
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("Quarterly")}>
              Quarterly
            </Button>
            <Button type="dashed" onClick={() => onClickHandler("yearly")}>
              Yearly
            </Button>
            <Button
              type="default"
              onClick={() => {
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                multipleDeleteHandler();
              }}
              disabled={isSelect === false}
            >
              Delete Selected
            </Button>
          </>
        )}
      </menu>

      {loading ? (
        <Spin
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
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
            filteredTask?.map((item) => (
              <List.Item
                key={item.id}
                style={{
                  borderRadius: "15px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 5px 20px, rgba(0, 0, 0, 0.23) 0px 3px 3px",
                  padding: "5%",
                  marginBottom: "5%",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${
                        item.status === "TODO"
                          ? "Gizmo"
                          : item.status === "IN-PROGRESS"
                          ? "Scooter"
                          : "Lilly"
                      }&backgroundColor=d84be5`}
                    />
                  }
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  title={<a onClick={() => onEdit(item)}>{item?.title}</a>}
                  description={
                    <>
                      <p
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></p>
                      <i>Created At {item?.createdAt}</i>
                      <br />
                      <i>Updated At {item?.updatedAt}</i>
                      <br />
                      <p>Due Date: {item?.dueDate}</p>
                    </>
                  }
                />
                <Checkbox
                  style={{ width: "1.7rem", scale: "1.5" }}
                  onChange={() => {
                    idHandler(item);
                  }}
                ></Checkbox>

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
      )}
    </>
  );
};

export default Task;
