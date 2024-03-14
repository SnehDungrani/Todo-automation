import React, { useCallback, useEffect, useState } from "react";
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

const Task = ({
  nTasks,
  dTasks,
  onDelete,
  onEdit,
  onFilter,
  onDailyFilter,
  // filteredData,
  // dailyFilteredData,
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multipleId, setMultipleId] = useState([]);

  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [normalTask, setNormalTask] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const API = useHttp();

  useEffect(() => {
    setNormalTask(
      nTasks.filter(
        (item) => item?.task_frequency === null || item?.task_frequency !== null
      )
    );
    setAllDailyTasks(dTasks.filter((item) => item?.task_frequency !== null));
  }, [nTasks, dTasks]);

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

  const selectAllHandler = () => {
    setIsChecked((pr) => !pr);
  };

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
            <Button type="dashed" onClick={() => setSelectedType("NORMAL")}>
              All
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onFilter("TODO");
              }}
            >
              To-Do
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onFilter("IN-PROGRESS");
              }}
            >
              In-Progress
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onFilter("DONE");
              }}
            >
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
        {selectedType === "DAILY" && (
          <>
            <Button type="dashed" onClick={() => setSelectedType("DAILY")}>
              All
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onDailyFilter("Daily");
              }}
            >
              Daily
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onDailyFilter("weekly");
              }}
            >
              Weekly
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onDailyFilter("monthly");
              }}
            >
              Monthly
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onDailyFilter("Quarterly");
              }}
            >
              Quarterly
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                onDailyFilter("yearly");
              }}
            >
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
      {filteredTask.length > 0 && (
        <div
          style={{ textAlign: "right", marginRight: "6%", marginBottom: "2%" }}
        >
          <Checkbox onChange={selectAllHandler} style={{ scale: "1.2" }}>
            Select all
          </Checkbox>
        </div>
      )}
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
                    "rgba(0, 0, 0, 0.19) 0px 5px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                  padding: "5%",
                  marginBottom: "5%",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${item.id}`}
                    />
                  }
                  title={<a href="https://ant.design">{item?.title}</a>}
                  description={
                    <>
                      <p
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></p>
                      <i>Created on {item?.createdAt}</i>
                      <br />
                      <i>updated on {item?.updatedAt}</i>
                    </>
                  }
                />
                <Checkbox
                  style={{ width: "1.7rem", scale: "1.5" }}
                  onChange={() => {
                    idHandler(item);
                    if (isChecked) {
                      setIsChecked((pr) => !pr);
                    } else {
                      setIsChecked(false);
                    }
                  }}
                  // checked={isChecked === true ? isChecked : false}
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
