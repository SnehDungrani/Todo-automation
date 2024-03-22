import { useEffect, useMemo, useState } from "react";
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
import { DownOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import dayjs from "dayjs";
import moment from "moment";
import useHttp from "../Hooks/use-http";
import CONSTANTS from "../util/constant/CONSTANTS";
import { apiGenerator } from "../util/functions";
import { deleteAuthDetails } from "../util/API/authStorage";
import Task from "./Task";
import { TaskContext } from "../store/task-context";

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

export default function Home() {
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
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTask();
  }, [refresh, tempId]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading((pr) => !pr);

        await API.sendRequest(CONSTANTS.API.repeatTodo.get, (res) => {
          setIsLoading((pr) => !pr);
          setDailyTodos(res.data);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTask();
  }, [refresh, tempId]);

  useEffect(() => {
    if (defaultData !== null && defaultData.task_frequency === "custom") {
      setIsOption("custom");
    } else {
      setIsOption("");
    }
  }, [defaultData]);

  const submitHandler = (e) => {
    e.preventDefault();

    form
      .validateFields()
      .then(async (value) => {
        console.log(value);

        const formattedDate = {};

        if (value?.dueDate) {
          formattedDate.dueDate = dayjs(value?.dueDate).format("DD/MM/YYYY");
        }

        const newFormData = { ...value, ...formattedDate };

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
                  newFormData,
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
                  newFormData,
                  "Daily Task Updated successfully"
                );
              }
            } catch (err) {
              console.error(err);
            }
          } else if (isDaily) {
            await API.sendRequest(
              CONSTANTS.API.repeatTodo.add,
              (res) => {
                if (res?.status === "success") {
                  setRefresh((pr) => !pr);
                }
              },
              newFormData,
              "Daily Task Added successfully"
            );
          } else {
            await API.sendRequest(
              CONSTANTS.API.todo.add,
              (res) => {
                if (res?.status === "success") {
                  setRefresh((pr) => !pr);
                }
              },
              newFormData,
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
    const initialValues = {
      ...item,
      dueDate: dayjs(item.dueDate, "DD/MM/YYYY"),
    };
    form.setFieldsValue(initialValues);
    setDefaultDataSet(item);
    setTempId(item.id);
  };

  const deleteTask = async (item, selectedType) => {
    let deleteApi;
    let successMessage;

    if (selectedType === "NORMAL") {
      deleteApi = apiGenerator(CONSTANTS.API.todo.delete, { id: item.id });
      successMessage = "Normal Task";
    } else {
      deleteApi = apiGenerator(CONSTANTS.API.repeatTodo.delete, {
        id: item.id,
      });
      successMessage = "Daily Task";
    }

    await API.sendRequest(
      deleteApi,
      (res) => {
        if (res?.status === "success") {
          setRefresh((pr) => !pr);
        }
      },
      {},
      `${successMessage} Deleted successfully`
    );
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

  const tsxValue = useMemo(
    () => ({
      nTasks: normalTodos,
      dTasks: dailyTodos,
      onDelete: deleteTask,
      onEdit: editTask,
      onFilter: NormalTaskFilter,
      onDailyFilter: dailyTaskFilter,
      filteredData,
      dailyFilteredData,
      handleLogout,
    }),
    [
      normalTodos,
      dailyTodos,
      deleteTask,
      editTask,
      NormalTaskFilter,
      dailyTaskFilter,
      filteredData,
      dailyFilteredData,
      handleLogout,
    ]
  );

  const options = [
    "Daily",
    "weekDays",
    "weekly",
    "monthly",
    "Quarterly",
    "yearly",
    "custom",
  ];

  const weekDays = [
    { value: "sun", label: "SU" },
    { value: "mon", label: "MO" },
    { value: "tue", label: "TU" },
    { value: "wed", label: "WE" },
    { value: "thu", label: "TH" },
    { value: "fri", label: "FR" },
    { value: "sat", label: "SA" },
  ];

  const onChange = (e) => {
    const { value } = e.target;
    const isChecked = e.target.checked;

    isChecked
      ? setSelectedValue([...selectedValue, value])
      : setSelectedValue(selectedValue.filter((day) => day !== value));
  };

  const durationTypes = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const durationTypeSelect = <Select options={durationTypes} />;

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
                  label: (
                    <p>
                      Hello,
                      {localStorage.getItem("name")}
                    </p>
                  ),
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
            <Button
              onClick={(e) => e.preventDefault()}
              style={{ background: "transparent", border: "none" }}
            >
              <Space style={{ color: "white" }}>
                Profile
                <DownOutlined />
              </Space>
            </Button>
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
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Title"
              name="title"
              id="title"
              required
              rules={[
                {
                  required: true,
                  message: "Please Enter valid Title",
                },
              ]}
            >
              <Input placeholder="Enter title" required />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              id="description"
              rules={[
                {
                  required: true,
                  message: "Please Enter valid Description",
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
              <DatePicker
                format="DD/MM/YYYY"
                // value={value?.dueDate}
                disabledDate={(current) => {
                  return current && current < moment().startOf("day");
                }}
              />
            </Form.Item>

            {defaultData === null && (
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
            )}
            {defaultData !== null && (
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
            )}
            {(isDaily ||
              (defaultData !== null &&
                defaultData.task_frequency !== null)) && (
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
            )}
            {isOption === "weekDays" && (
              <Form.Item name="selectedDays">
                <Checkbox.Group>
                  {weekDays.map((checkbox) => (
                    <Checkbox
                      style={{ margin: "1%" }}
                      onChange={onChange}
                      value={checkbox.value}
                      key={checkbox.value}
                    >
                      {checkbox.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            )}
            {isOption === "custom" && (
              <div className="custom">
                <Form.List
                  name={["duration"]}
                  initialValue={[{ durationCount: "1", durationType: "Daily" }]}
                >
                  {(list) =>
                    list.map((item) => (
                      <Form.Item
                        key={item.key}
                        {...item}
                        name={[item.name, "durationCount"]}
                        style={{ width: "30%" }}
                        rules={[
                          { required: true },
                          {
                            pattern: /^[1-9]\d{0,2}$/,
                            message: "Please enter a number between 1 and 999",
                          },
                        ]}
                      >
                        <Input
                          addonAfter={
                            <Form.Item
                              name={[item.name, "durationType"]}
                              noStyle
                              initialValue="Daily"
                            >
                              {durationTypeSelect}
                            </Form.Item>
                          }
                        />
                      </Form.Item>
                    ))
                  }
                </Form.List>
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
}
