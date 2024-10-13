import React, { useState } from "react";

const Input = ({ setAllTodos }) => {
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

    // Get current todos from localStorage
    const currentTodos = JSON.parse(localStorage.getItem("todolist")) || [];
    const updatedToDoArr = [...currentTodos, newToDoItem];
    
    // Update the state in parent
    setAllTodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));

    // Clear input fields after adding a todo
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="flex flex-col items-center p-5 mt-10 w-full">
      <form
        className="flex flex-col w-full space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToDo();
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="titleInput" className="text-sm">Title</label>
          <input
            id="titleInput" // Link this with the label
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full max-w-md p-2 rounded bg-neutral-900 text-sm h-10"
            placeholder="Enter your task here"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descInput" className="text-sm">Description</label>
          <input
            id="descInput" // Link this with the label
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full max-w-md p-2 rounded bg-neutral-900 text-sm h-10"
            placeholder="Description"
          />
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 w-11/12 rounded-md text-white"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setNewTitle("");
              setNewDesc("");
              document.getElementById("titleInput").focus(); // Focus on title input after reset
            }}
            className="py-1 px-1 border rounded-md bg-neutral-800 w-11/12 text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
