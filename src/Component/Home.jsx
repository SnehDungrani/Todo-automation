import React, { useRef, useState } from "react";
import Task from "./Task";
import Modal from "./Modal";

import { Button, Form, Input } from "antd";
const { TextArea } = Input;

export const Home = () => {
  const modal = useRef();
  const [tasks, setTasks] = useState([]);

  const [id, setId] = useState(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      modal.current.open();
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks];

      updatedTasks[editIndex] = { title, description, id };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      const newTask = { title, description, id };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setId(undefined);
  };

  const editTask = (id) => {
    const taskToEdit = tasks[id];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditIndex(id);

    console.log(id);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((_, i) => i !== id);
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="invalid-input">Invalid Input</h2>
        <br />
        <p className="first-p">
          Oops.. looks like you forget to enter a value.
        </p>
        <p className="second-p">
          Please make sure you provide a valid value for every input field.
        </p>
        <br />
      </Modal>

      <div className="container">
        <h1>Daily Task</h1>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          style={{
            maxWidth: formLayout === "inline" ? "none" : 600,
          }}
        >
          <Form.Item label="Title">
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              showCount
              maxLength={100}
              placeholder="Enter description"
              style={{
                height: 120,
                resize: "none",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={submitHandler}>
              Add
            </Button>
          </Form.Item>
        </Form>

        {tasks.map((item, index) => (
          <Task
            key={index}
            id={`todo-${index}`}
            title={item.title}
            description={item.description}
            onDelete={() => deleteTask(index)}
            onEdit={() => editTask(index)}
          />
        ))}
      </div>
    </>
  );
};
