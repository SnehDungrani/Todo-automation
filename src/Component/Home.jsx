import React, { useRef, useState } from "react";
import Task from "./Task";
import Modal from "./Modal";

export const Home = () => {
  const modal = useRef();
  const [tasks, setTasks] = useState([]);

  const [id, setId] = useState(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editIndex, setEditIndex] = useState(null);

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
        <form onSubmit={submitHandler}>
          <h1>Daily Task</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            rows="7"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">{editIndex !== null ? "Edit" : "Add"}</button>
        </form>
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
