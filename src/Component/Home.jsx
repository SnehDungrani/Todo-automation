import React, { useEffect, useState } from "react";
import {
  BackTop,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Select,
  Space,
  Spin,
  Tooltip,
  notification,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useHttp from "../Hooks/use-http";
import CONSTANTS from "../util/constant/CONSTANTS";
import { apiGenerator } from "../util/functions";
import { deleteAuthDetails } from "../util/API/authStorage";
import { DownOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import Task from "./Task";
import { TaskContext } from "../store/task-context.jsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import dayjs from "dayjs";

const headerStyle = {
  textAlign: "right",
  width: "100%",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#8458b3a4",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  zIndex: "1",
  backdropFilter: "blur(10px)",
  justifyContent: "space-between",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
};

export const Home = () => {
  const [normalTodos, setNormalTodos] = useState([]);
  const [dailyTodos, setDailyTodos] = useState([]);
  const [tempId, setTempId] = useState("");
  const [defaultData, setDefaultDataSet] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isDaily, setIsDaily] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const [dailyFilteredData, setDailyFilteredData] = useState([]);
  const [isOption, setIsOption] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const API = useHttp();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading((pr) => !pr);
        await API.sendRequest(CONSTANTS.API.todo.get, (res) => {
          setIsLoading((pr) => !pr);
          setNormalTodos(res.data);
        });
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchTask();
    // eslint-disable-next-line
  }, [refresh, tempId]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading((pr) => !pr);

        await API.sendRequest(CONSTANTS.API.repeatTodo.get, (res) => {
          setIsLoading((pr) => !pr);
          setDailyTodos(res.data);
        });
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchTask();
    // eslint-disable-next-line
  }, [refresh, tempId]);

  const submitHandler = (e) => {
    e.preventDefault();

    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        // const newDate = value.dueDate.split("-").reverse().join("/");

        // const newFormData = { ...value, dueDate: newDate };

        // console.log(Fields);

        value.dueDate =
          value.dueDate.$D +
          "/" +
          (value.dueDate.$M + 1) +
          "/" +
          value.dueDate.$y;

        // const newDate = value.dueDate ? dayjs(value.dueDate).toDate() : null;
        // value.dueDate = newDate;

        if (value !== null) {
          if (defaultData !== null) {
            try {
              if (defaultData.task_frequency === null) {
                const UPDATE_API = apiGenerator(CONSTANTS.API.todo.update, {
                  id: tempId,
                });

                await API.sendRequest(
                  UPDATE_API,
                  (res) => {
                    if (res?.status === "success") {
                      setRefresh((pr) => !pr);
                    }
                  },
                  value,
                  "Normal Task Updated successfully"
                );
              } else {
                const UPDATE_API = apiGenerator(
                  CONSTANTS.API.repeatTodo.update,
                  {
                    id: tempId,
                  }
                );

                await API.sendRequest(
                  UPDATE_API,
                  (res) => {
                    if (res?.status === "success") {
                      setRefresh((pr) => !pr);
                    }
                  },
                  value,
                  "Daily Task Updated successfully"
                );
              }
            } catch (err) {
              console.error(err);
            }
          } else {
            if (isDaily) {
              await API.sendRequest(
                CONSTANTS.API.repeatTodo.add,
                (res) => {
                  if (res?.status === "success") {
                    setRefresh((pr) => !pr);
                    console.log(res);
                  }
                },
                value,
                "Daily Task Added successfully"
              );
            } else {
              await API.sendRequest(
                CONSTANTS.API.todo.add,
                (res) => {
                  if (res?.status === "success") {
                    setRefresh((pr) => !pr);
                    console.log(res);
                  }
                },
                value,
                "Task Added successfully"
              );
            }
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

  const deleteTask = async (item, selectedType) => {
    if (selectedType === "NORMAL") {
      const DELETE_API = apiGenerator(CONSTANTS.API.todo.delete, {
        id: item.id,
      });

      await API.sendRequest(
        DELETE_API,
        (res) => {
          if (res?.status === "success") {
            setRefresh((pr) => !pr);
          }
        },
        {},
        "Normal Task Deleted successfully"
      );
    } else {
      const DELETE_API = apiGenerator(CONSTANTS.API.repeatTodo.delete, {
        id: item.id,
      });

      await API.sendRequest(
        DELETE_API,
        (res) => {
          if (res?.status === "success") {
            setRefresh((pr) => !pr);
          }
        },
        {},
        "Daily Task Deleted successfully"
      );
    }
  };

  const NormalTaskFilter = async (props) => {
    try {
      const FILTER_API = apiGenerator(CONSTANTS.API.todo.filter, {
        statusType: props,
      });
      await API.sendRequest(FILTER_API, (res) => {
        setFilteredData(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const dailyTaskFilter = async (props) => {
    try {
      const FILTER_API = apiGenerator(CONSTANTS.API.repeatTodo.filter, {
        taskType: props,
      });
      await API.sendRequest(FILTER_API, (res) => {
        setDailyFilteredData(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    try {
      deleteAuthDetails();
      notification.success({ message: "logging out....", duration: 0.5 });

      setTimeout(() => {
        navigate("/");

        notification.success({
          message: "Logout Successfully",
          duration: 2,
        });
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const tsxValue = {
    nTasks: normalTodos,
    dTasks: dailyTodos,
    onDelete: deleteTask,
    onEdit: editTask,
    onFilter: NormalTaskFilter,
    onDailyFilter: dailyTaskFilter,
    filteredData: filteredData,
    dailyFilteredData: dailyFilteredData,
  };

  const options = [
    "Daily",
    "weekDays",
    "weekly",
    "monthly",
    "Quarterly",
    "yearly",
    "custom",
  ];

  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const onChange = (e) => {
    const { value } = e.target;
    const isChecked = e.target.checked;

    isChecked
      ? setSelectedValue([...selectedValue, value])
      : setSelectedValue(selectedValue.filter((day) => day !== value));
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div>
            <p style={{ fontSize: "30PX", fontWeight: "500" }}>TO-DO</p>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  label: <p>Hello, {localStorage.getItem("name")}</p>,
                  style: { textAlign: "center", padding: "0" },
                  key: "0",
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <Tooltip placement="bottom" title="Logout" color="#23355d">
                      <Button
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={handleLogout}
                      >
                        Logout
                        <span>&nbsp;</span>
                        <AiOutlineLogout />
                      </Button>
                    </Tooltip>
                  ),
                  key: "2",
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ color: "white" }}>
                Profile
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
      </Layout>
      <div className="container ">
        <h1>Tasks</h1>
        <div className="btn-main" style={{ width: "100%" }}>
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

            <Form.Item
              id="date"
              name="dueDate"
              label="Select Due Date"
              required
            >
              <DatePicker />
            </Form.Item>

            {defaultData === null && (
              <>
                <Form.Item
                  id="radio"
                  name="status"
                  label="Select Task Type"
                  required
                >
                  <Radio.Group>
                    <Radio
                      value="TODO"
                      onClick={() => {
                        setIsDaily(false);
                      }}
                    >
                      Normal Task
                    </Radio>
                    <Radio
                      value="IN-PROGRESS"
                      onClick={() => {
                        setIsDaily(true);
                      }}
                    >
                      Daily Task
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
            {defaultData !== null && (
              <>
                <Form.Item
                  id="radio"
                  name="status"
                  label="Select Task Type"
                  required
                >
                  <Radio.Group>
                    <Radio value="TODO">Todos</Radio>
                    <Radio value="IN-PROGRESS">In-Progress</Radio>
                    <Radio value="DONE">Mark as completed</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
            {(isDaily ||
              (defaultData !== null &&
                defaultData.task_frequency !== null)) && (
              <>
                <Form.Item
                  name="task_frequency"
                  label="Select Frequency"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select your task type!",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "40%" }}
                    defaultValue="Select Task"
                    onChange={(value) => {
                      setIsOption(value);
                    }}
                  >
                    {options.map((option) => (
                      <Option value={option} key={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
            {isOption === "weekDays" && isDaily && (
              <>
                {weekDays.map((checkbox) => (
                  <Checkbox
                    style={{ margin: "1%" }}
                    onChange={onChange}
                    value={checkbox}
                    key={checkbox}
                  >
                    {checkbox}
                  </Checkbox>
                ))}
              </>
            )}
            {isOption === "custom" && isDaily && (
              <div className="custom">
                <div className="custom-1">
                  <Form.Item
                    name="dayCount"
                    rules={[
                      { required: true },
                      {
                        pattern: /^[1-9]\d{0,2}$/,
                      },
                    ]}
                    style={{ width: "15%" }}
                  >
                    <Input defaultValue="1" />
                  </Form.Item>
                  <Form.Item name="duration" rules={[{ required: true }]}>
                    <Select
                      style={{ width: 120 }}
                      defaultValue="Select duration"
                    >
                      <Option value="day">Daily</Option>
                      <Option value="week">Weekly</Option>
                      <Option value="month">Monthly</Option>
                      <Option value="year">Yearly</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
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
          <TaskContext.Provider value={tsxValue}>
            <Task />
          </TaskContext.Provider>
        )}
      </div>
      <div>
        <BackTop>
          <div className="ant-back-top-inner">
            <MdKeyboardDoubleArrowUp />
          </div>
        </BackTop>
      </div>
      ,
    </>
  );
};
