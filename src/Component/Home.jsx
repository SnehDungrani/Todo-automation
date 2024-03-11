import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Radio,
  Spin,
  Tooltip,
  notification,
} from "antd";
import Task from "./Task";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useHttp from "../Hooks/use-http";
import CONSTANTS from "../util/constant/CONSTANTS";
import { apiGenerator } from "../util/functions";
import { deleteAuthDetails } from "../util/API/authStorage";
import { QuestionCircleOutlined } from "@ant-design/icons";

const headerStyle = {
  textAlign: "right",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#8458b3",
};
const layoutStyle = {
  overflow: "hidden",
  width: "calc(100%)",
  maxWidth: "calc(100%)",
};

// const { TextArea } = Input;

export const Home = () => {
  // const [tasks, setTasks] = useState([]);

  const [todos, setTodos] = useState([]);
  const [tempId, setTempId] = useState("");
  const [defaultData, setDefaultDataSet] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const API = useHttp();
  // const val = localStorage.getItem("user");
  // var object = JSON.parse(val);
  // const path = object.uid;

  useEffect(() => {
    //fetch

    const fetchTask = () => {
      setIsLoading(true);
      console.log(tempId);

      API.sendRequest(CONSTANTS.API.todo.get, (res) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setTodos(res.data);
      });
    };

    fetchTask();
  }, [refresh, tempId]);

  const submitHandler = (e) => {
    e.preventDefault();

    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        if (value !== null) {
          if (defaultData !== null) {
            try {
              //update

              const UPDATE_API = apiGenerator(CONSTANTS.API.todo.update, {
                id: tempId,
              });

              API.sendRequest(
                UPDATE_API,

                (res) => {
                  if (res?.status === "success") {
                    setRefresh((pr) => !pr);
                  }
                },
                value,
                "Task Updated successfully"
              );
            } catch (err) {
              console.error(err);
            }
          } else {
            //store

            API.sendRequest(
              CONSTANTS.API.todo.add,
              (res) => {
                console.log(res);
                if (res?.status === "success") {
                  setRefresh((pr) => !pr);
                }
              },
              value,
              "Task Added successfully"
            );
          }

          setIsModalOpen((pr) => !pr);
          setDefaultDataSet(null);
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  const editTask = (item) => {
    setIsModalOpen((pr) => !pr);
    form.setFieldsValue(item);
    setDefaultDataSet(item);

    setTempId(item.id);
  };

  const deleteTask = async (item) => {
    const DELETE_API = apiGenerator(CONSTANTS.API.todo.delete, { id: item.id });

    API.sendRequest(
      DELETE_API,
      (res) => {
        console.log(res);
        if (res?.status === "success") {
          setRefresh((pr) => !pr);
        }
      },
      {},
      "Task Deleted successfully"
    );
  };

  const handleLogout = async () => {
    try {
      deleteAuthDetails();
      notification.success({ message: "logging out....", duration: 0.5 });

      setTimeout(() => {
        navigate("/login");

        notification.success({
          message: "Logout Successfully",
          duration: 2,
        });
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Tooltip placement="bottom" title="Logout" color="#23355d">
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
              onConfirm={handleLogout}
            >
              <Button>
                <AiOutlineLogout />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Header>
      </Layout>
      <div className="container ">
        <h1>Daily Task</h1>
        <div
          className="btn-main"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="dashed"
            block
            onClick={() => setIsModalOpen(true)}
            style={{ borderColor: "#8458B3" }}
          >
            + Add New Task
          </Button>
        </div>
        <Modal
          title="Add your task"
          centered
          open={isModalOpen}
          okText={defaultData !== null ? "Update" : "Add"}
          onOk={submitHandler}
          onCancel={() => {
            setIsModalOpen(false);
            setDefaultDataSet(null);
          }}
          okButtonProps={{ style: { backgroundColor: "#8458B3" } }}
        >
          <Form layout={"vertical"} form={form}>
            <Form.Item
              label="Title"
              name="title"
              id="title"
              required={true}
              rules={[
                {
                  required: true,
                  message: `Please Enter valid Title`,
                },
              ]}
            >
              <Input placeholder="Enter title" required={true} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              id="description"
              rules={[
                {
                  required: true,
                  message: `Please Enter valid Description`,
                },
              ]}
            >
              <ReactQuill placeholder="Enter Description" />
            </Form.Item>
            <br />
            {defaultData === null ? (
              <Form.Item
                id="radio"
                name="status"
                label="Select Task Type"
                required
              >
                <Radio.Group>
                  <Radio value="IN-PROGRESS">Current Todo</Radio>
                  <Radio value="TODO">Todo</Radio>
                  <Radio value="DAILY">Daily Todo</Radio>
                  <Radio value="DONE">Mark as completed</Radio>
                </Radio.Group>
              </Form.Item>
            ) : (
              <Form.Item
                id="radio"
                name="status"
                label="Select Task Type"
                required
              >
                <Radio.Group>
                  <Radio value="DONE">Mark as completed</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          </Form>
        </Modal>
        <br />
        <br />
        {isLoading ? (
          <Spin
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : (
          <Task tasks={todos} onDelete={deleteTask} onEdit={editTask} />
        )}
      </div>
    </>
  );
};
