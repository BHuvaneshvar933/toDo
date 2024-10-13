import React, { useEffect, useState } from "react";
import { Trash2, Check } from "lucide-react";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import Input from "./components/Input";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todolist")) || [];
    const savedCompletedTodos = JSON.parse(localStorage.getItem("completedtodolist")) || [];
    setAllTodos(savedTodos);
    setCompletedTodos(savedCompletedTodos);
  }, []);

  const handleDeleteTodo = (index) => {
    const reducedTodos = allTodos.filter((_, i) => i !== index);
    setAllTodos(reducedTodos);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
  };

  const handleDeleteTodoC = (index) => {
    const reducedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(reducedCompletedTodos);
    localStorage.setItem("completedtodolist", JSON.stringify(reducedCompletedTodos));
  };

  const handleComplete = (index) => {
    const completedTodo = { ...allTodos[index], completedOn: new Date().toLocaleString() };
    const updatedCompletedTodos = [...completedTodos, completedTodo];
    setCompletedTodos(updatedCompletedTodos);
    handleDeleteTodo(index);
    localStorage.setItem("completedtodolist", JSON.stringify(updatedCompletedTodos));
  };

  return (
    <div className="overflow-auto max-w-full">
      <NavBar />
      <div className="w-full max-w-lg mx-auto my-14 overflow-auto lg:text-sm  ">
        <Heading />
        <Input setAllTodos={setAllTodos} />
        <div className="relative flex w-full  flex-col items-center">
          <div className="flex space-x-2 mb-4">
            <button
              className={`py-2 px-4 rounded-md ${!isCompleteScreen ? "bg-gradient-to-r from-orange-500 to-orange-800" : "bg-neutral-900"}`}
              onClick={() => setIsCompleteScreen(false)}
            >
              ToDo
            </button>
            <button
              className={`py-2 px-4 rounded-md ${isCompleteScreen ? "bg-gradient-to-r from-orange-500 to-orange-800" : "bg-neutral-900"}`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className="w-full max-w-lg mx-auto rounded mb-3  overflow-hidden ">
            {isCompleteScreen === false && allTodos.map((item, index) => (
              <div key={index} className="flex justify-between bg-neutral-900 mt-2 p-4 mr-2 rounded mb-2">
                <div className="flex flex-col">
                  <h3 className="text-lg text-white font-bold">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded bg-gradient-to-r from-orange-500 to-orange-800" onClick={() => handleDeleteTodo(index)}>
                    <Trash2 />
                  </button>
                  <button className="p-2 border rounded-md" onClick={() => handleComplete(index)}>
                    <Check />
                  </button>
                </div>
              </div>
            ))}
            {isCompleteScreen === true && completedTodos.map((item, index) => (
              <div key={index} className="flex justify-between bg-neutral-900 mt-2 p-4 rounded mb-2">
                <div className="flex flex-col">
                  <h3 className="text-lg text-white font-bold">{item.title}</h3>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                  <p>
                    <small className="text-xs text-zinc-400">Completed on: {item.completedOn}</small>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded bg-gradient-to-r from-orange-500 to-orange-800" onClick={() => handleDeleteTodoC(index)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
