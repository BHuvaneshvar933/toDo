import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Trash2, Check } from "lucide-react";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import Input from "./components/Input";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [input, setInput] = useState(newDesc);

  useEffect(() => {
    let savedToDO = JSON.parse(localStorage.getItem("todolist"));
    if (savedToDO) {
      setAllTodos(savedToDO);
    }
  });
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };
  const handleDeleteTodoC = (index) => {
    let reducedTodoc = [...completedTodos];
    reducedTodoc.splice(index, 1);
    localStorage.setItem("completedtodolist", JSON.stringify(reducedTodoc));
    setCompletedTodos(reducedTodoc);
  };
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem(
      "completedtodolist",
      JSON.stringify(updatedCompletedArr)
    );
  };
  useEffect(() => {
    let savedCompletedToDO = JSON.parse(
      localStorage.getItem("completedtodolist")
    );
    if (savedCompletedToDO) {
      setCompletedTodos(savedCompletedToDO);
    }
  });

  return (
    <div className="overflow-y: auto max-lg::w-full max-lg:w-full ">
      <NavBar />
      <div className="w-2/3 h-4/5  mx-auto my-14 overflow-y: auto lg:text-sm max-lg:mx-0 max-lg:w-3/4">
        <Heading />
        <div className="absolute max-sm:w-full items-center">
          <Input />
          <div className="ml-16 ">
            <button
              className={
                "" +
                (!isCompleteScreen
                  ? "bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 "
                  : "bg-neutral-900 h-10 border border-neutral-700 py-2 px-4 max-lg:-ml-4")
              }
              value="active"
              onClick={() => setIsCompleteScreen(false)}
            >
              ToDo
            </button>
            <button
              className={
                isCompleteScreen
                  ? "bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 "
                  : "bg-neutral-900 h-10 border border-neutral-700 py-2 px-4"
              }
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className=" w-11/12 ml-9 rounded mb-3 overflow-hidden max-sm:ml-4  max-lg:ml-16">
            {isCompleteScreen === false &&
              allTodos.map((item, index) => {
                return (
                  <div className="flex justify-between  bg-neutral-900 mt-2 w mx-auto pt-2 px-6 py-2 w-11/12 rounded mb-2">
                    <div className="flex flex-col">
                      <h3 className="text-2xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent  bg-clip-text">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                    <div className=" px-2 py-1.5 h-9 mr-0 rounded ">
                      <button
                        className=" px-2 py-1.5 h-9 mr-0 rounded bg-gradient-to-r from-orange-500 to-orange-800"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        {<Trash2 />}
                      </button>
                      <button
                        className="py-1 px-2 border rounded-md ml-2"
                        onClick={() => handleComplete(index)}
                      >
                        {<Check />}
                      </button>
                    </div>
                  </div>
                );
              })}
            {<value />}
            {isCompleteScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between  bg-neutral-900 mt-2 w mx-auto pt-2 px-6 py-2 w-11/12 rounded mb-2 "
                  >
                    <div className="flex flex-col">
                      <h3 className="text-2xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent  bg-clip-text">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400">{item.desc}</p>
                      <p>
                        <small className="text-xs text-zinc-400">
                          Completed on: {item.completedOn}
                        </small>
                      </p>
                    </div>
                    <div className=" px-2 py-1.5 h-9 mr-0 rounded mt-4 bg-gradient-to-r from-orange-500 to-orange-800">
                      <button
                        className="p-0 "
                        onClick={() => handleDeleteTodoC(index)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
