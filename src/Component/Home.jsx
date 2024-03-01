import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import Task from "./Task";

const { TextArea } = Input;

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [defaultData, setDefaultDataSet] = useState(null);

  const [modal2Open, setModal2Open] = useState(false);

  const [form] = Form.useForm();

  const submitHandler = (e) => {
    e.preventDefault();

    form
      .validateFields()
      .then((value) => {
        if (value !== null) {
          const id = new Date().getTime().toString();
          const valueWithId = { id, ...value };

          if (defaultData !== null) {
            const updatedTask = tasks.map((task) =>
              task.id === defaultData.id ? valueWithId : task
            );
            setTasks(updatedTask);

            notification.success({
              message: "SUCCESS",
              description: "Task Edit successfully",
              duration: 1,
            });
          } else {
            setTasks((prev) => [...prev, valueWithId]);

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

  console.log(tasks);

  const editTask = (index) => {
    setModal2Open((pr) => !pr);
    console.log(index);
    const taskToEdit = tasks[index];
    form.setFieldsValue(taskToEdit);
    setDefaultDataSet(taskToEdit);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((_, i) => i !== id);
    setTasks(updatedTasks);
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
          okText={defaultData !== null ? "Edit" : "Add"}
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
              <TextArea
                showCount
                maxLength={100}
                required={true}
                placeholder="Enter description"
                style={{
                  height: 120,
                  resize: "none",
                }}
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
