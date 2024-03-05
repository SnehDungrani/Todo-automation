import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Modal, notification } from "antd";
import Task from "./Task";
import { Header } from "antd/es/layout/layout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { database } from "../firebase";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "firebase/database";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

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

const { TextArea } = Input;

export const Home = () => {
  // const [tasks, setTasks] = useState([]);

  const [todos, setTodos] = useState([]);
  const [tempUuid, setTempUuid] = useState("");
  const [defaultData, setDefaultDataSet] = useState(null);

  const [modal2Open, setModal2Open] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const val = localStorage.getItem("user");

  var object = JSON.parse(val);

  const path = object.uid;

  useEffect(() => {
    onValue(ref(database, path), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        try {
          Object.values(data).map((todo) => {
            setTodos((prev) => [...prev, todo]);
          });
        } catch (err) {
          console.error(err);
        }
      }
    });
  }, [path]);

  const submitHandler = (e) => {
    e.preventDefault();

    form
      .validateFields()
      .then(async (value) => {
        if (value !== null) {
          if (defaultData !== null) {
            try {
              await update(ref(database, `${path}/${tempUuid}`), {
                uuid: tempUuid,
                date: moment().format("L"),
                value,
              });

              // setTodos([]);

              notification.success({
                message: "Edit",
                description: "Task Edit successfully",
                duration: 1,
              });
            } catch (err) {
              console.error(err);
            }
          } else {
            // setTasks((prev) => [...prev, valueWithId]);

            //store
            const uuid = uid();
            await set(ref(database, `${path}/${uuid}`), {
              uuid,
              date: moment().format("L"),
              value,
            });

            notification.success({
              message: "SUCCESS",
              description: "Task Added successfully",
              duration: 1,
            });
          }

          setModal2Open((pr) => !pr);
          setDefaultDataSet(null);
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  const editTask = (item) => {
    setModal2Open((pr) => !pr);
    form.setFieldsValue(item?.value);
    setDefaultDataSet(item?.value);

    setTempUuid(item?.uuid);
  };

  const deleteTask = async (item) => {
    // const updatedTasks = tasks.filter((_, i) => i !== index);
    // setTasks(updatedTasks);

    //deleteTask

    try {
      await remove(ref(database, `${path}/${item.uuid}`));

      notification.success({
        message: "DELETE",
        description: "Task Deleted successfully",
        duration: 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      notification.success({
        message: "Logout Successfully",
        duration: 1,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Button onClick={handleLogout}>
            <AiOutlineLogout />
          </Button>
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
            onClick={() => setModal2Open(true)}
            style={{ borderColor: "#8458B3" }}
          >
            + Add New Task
          </Button>
        </div>
        <Modal
          title="Add your task"
          centered
          open={modal2Open}
          okText={defaultData !== null ? "Update" : "Add"}
          onOk={submitHandler}
          onCancel={() => {
            setModal2Open(false);
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
              {/* <TextArea
                showCount
                maxLength={100}
                required={true}
                placeholder="Enter description"
                style={{
                  height: 120,
                  resize: "none",
                }}
              /> */}
            </Form.Item>
            <br />
          </Form>
        </Modal>
        <br />
        <br />
        <Task tasks={todos} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </>
  );
};
