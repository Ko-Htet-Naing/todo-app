import React from "react";
import "./Form.css";
import Task from "../Tasks/Task.jsx";

const Form = () => {
  let inputRef = React.useRef(null);
  const [task, setTask] = React.useState([]);
  const [options, setOptions] = React.useState([
    "Normal",
    "Unimportant",
    "Important",
  ]);
  const initialSelectedValue = "Normal";
  const [inputValue, setInputValue] = React.useState("");
  const [selectedValue, setSelectedValue] =
    React.useState(initialSelectedValue);
  const [buttonState, setButtonState] = React.useState(false);
  const [id, setId] = React.useState(null);

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleDelete = (id) => {
    setTask(task.filter((todo) => todo.id !== id));
  };

  const handleChnage = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleUpdate = (id) => {
    setTask(
      task.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDBlClick = (id) => {
    task.map((todo) =>
      todo.id === id
        ? (setInputValue(todo.title),
          setSelectedValue(todo.priority),
          checkButtonState(id),
          setId(id))
        : null
    );
  };

  const checkButtonState = (id) => {
    task.map((todo) => (todo.id === id ? setButtonState(true) : null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    let updateStatus =
      task.length > 0 && task.some((todo) => (todo.id === id ? true : false));
    let random = getRandomNumber(1, 999);
    inputRef.current.value
      ? updateStatus
        ? setTask(
            task.map((todo) =>
              todo.id === id
                ? {
                    ...task,
                    id: random,
                    title: inputRef.current.value,
                    priority: selectedValue,
                  }
                : todo
            )
          )
        : setTask([
            ...task,
            {
              id: random,
              title: inputRef.current.value,
              completed: false,
              priority: selectedValue,
            },
          ])
      : alert("Input Something");

    inputRef.current.value = "";
    setInputValue("");
    setSelectedValue(initialSelectedValue);
  };

  return (
    <>
      <form className="custom-box">
        <div className="mb-3 d-flex">
          <input
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={(e) => (
              setInputValue(e.target.value), setButtonState("1")
            )}
            className="form-control custom-font border-end-0 rounded-end-0"
            placeholder="Enter task to do daily in your life......"
          />

          <select
            value={selectedValue}
            onChange={handleChnage}
            className="form-select custom-width  rounded-start-0 rounded-end-0 custom-font"
          >
            <option value="" disabled>
              Priority
            </option>
            {typeof options === "object" &&
              options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
          </select>
          <button
            className="btn btn-outline-secondary rounded-start-0"
            onClick={handleClick}
          >
            {buttonState === true ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <Task
        tasks={task}
        onDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleDBllClick={handleDBlClick}
      />
    </>
  );
};
export default Form;
