import React from "react";
import "./Task.css";

const Task = ({ tasks, onDelete, handleUpdate, handleDBllClick }) => {
  const handleDelete = (task) => {
    onDelete(task);
  };

  const handleClick = (id) => {
    handleUpdate(id);
  };

  const handleDblClick = (id) => {
    handleDBllClick(id);
  };

  return (
    <>
      {tasks.length !== 0 ? (
        tasks.map((task) => (
          <div
            className={`
              card mb-2 p-3 d-flex flex-row justify-content-between alert
             ${
               task.priority === "Important"
                 ? "alert-danger"
                 : task.priority === "Unimportant"
                 ? "alert-warning"
                 : "alert-primary"
             }
                `}
            key={task.id}
          >
            <p
              className={task.completed === true ? "strike" : null}
              onDoubleClick={() => handleDblClick(task.id)}
            >
              {task.title}
            </p>
            <div className="utility-box">
              <span>
                <input
                  type="checkbox"
                  className="rounded rounded-pill"
                  onClick={() => handleClick(task.id)}
                />
              </span>
              <span className="closeBtn" onClick={() => handleDelete(task.id)}>
                X
              </span>
            </div>
          </div>
        ))
      ) : (
        <p> There is no tasks yet... </p>
      )}
    </>
  );
};

export default Task;
