import React, { useState } from "react";

const Input = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddToDo = () => {
    if (!newTitle || !newDesc) {
      alert("Please fill out both fields");
      return;
    }

    const newToDoItem = {
      title: newTitle,
      desc: newDesc,
    };

    const updatedToDoArr = [...allTodos, newToDoItem];
    setAllTodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));

    // Clear input fields after adding a todo
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="flex flex-row items-center p-5 mt-10 max-lg:items-center max-lg:w-full max-lg:ml-14 max-sm:-ml-0">
      <form
        className="flex flex-row max-sm:flex-col max-lg:items-center max-lg:w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToDo();
        }}
      >
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-80 max-sm:w-80 max-lg:w-64 max-lg:text-xs rounded bg-neutral-900 text-sm h-8"
            placeholder="Enter your task here"
          />
        </div>
        <div className="flex flex-col ml-3">
          <label className="max-sm:-ml-1">Description</label>
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-80 max-sm:w-80 max-lg:w-64 max-lg:mr-2 max-lg:text-xs rounded bg-neutral-900 text-sm h-8 max-sm:-ml-1"
            placeholder="Description"
          />
        </div>

        <div className="input-item mt-5 ml-16 max-lg:ml-0 max-lg:flex max-lg:flex-row">
          <button
            type="submit"
            className="text-center bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 rounded-md"
          >
            Add
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewTitle("");
            setNewDesc("");
          }}
          className="mt-5 py-1 px-2 border rounded-md ml-2 max-lg:ml-0"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Input;
