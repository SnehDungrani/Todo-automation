import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
// import Modal from "./Modal";
import Task from "./Task";

const { TextArea } = Input;

export const Home = () => {
  const [tasks, setTasks] = useState([]);

  // const [title, setTitle] = useState("");
  const [defaultData, setDefaultDataSet] = useState(null);

  // const [description, setDescription] = useState("");
  // const [editIndex, setEditIndex] = useState(null);

  // const [show, setShow] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  // const [isEditItem, setIsEditItem] = useState();

  const [form] = Form.useForm();

  const submitHandler = (e) => {
    let id = new Date().getTime().toString();
    e.preventDefault();

    // if (title.trim() === "" || description.trim() === "") {
    //   notification.error({
    //     message: "Please add some task",
    //     duration: 1,
    //   });
    //   return;
    // }

    form
      .validateFields()
      .then((value) => {
        console.log(value);

        if (value !== null) {
          const valueWithId = { id, ...value };
          setTasks((prev) => [...prev, valueWithId]);
        }

        notification.success({
          message: "SUCCESS",
          description: "Task Added successfully",
          duration: 1,
        });
        setModal2Open((pr) => !pr);
        form.resetFields();
      })
      .catch((err) => console.log(err));
    // if (editIndex !== null) {
    //   const updatedTasks = [...tasks];

    //   updatedTasks[editIndex] = { title, description, id };
    //   setTasks(updatedTasks);
    //   setEditIndex(null);
    // } else {
    //   setIsEdit("Add");

    //   // const newTask = { title, description, id };
    //   // setTasks([...tasks, newTask]);

    //   // console.log(newTask);
    // }

    // setTitle("");
    // setDescription("");
    // setId(undefined);
  };

  console.log(tasks);

  const editTask = (index) => {
    setModal2Open((pr) => !pr);
    console.log(index);
    const taskToEdit = tasks[index];
    form.setFieldsValue(taskToEdit);
    setDefaultDataSet(taskToEdit);

    // setIsEditItem(taskToEdit.id);

    // setTitle(taskToEdit.title);
    // setDescription(taskToEdit.description);
    // setEditIndex(index);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((_, i) => i !== id);
    setTasks(updatedTasks);
    // setEditIndex(null);
    notification.error({
      message: "DELETE",
      description: "Task Deleted successfully",
      duration: 1,
    });
  };

  console.log(defaultData);

  return (
    <>
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
          okText={defaultData !== null ? "edit" : "add"}
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
              <Input
                placeholder="Enter title"
                required={true}
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
              />
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
              <TextArea
                showCount
                maxLength={100}
                required={true}
                placeholder="Enter description"
                style={{
                  height: 120,
                  resize: "none",
                }}
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <br />
          </Form>
        </Modal>
        <br />
        <br />
        <Task tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </>
  );
};
