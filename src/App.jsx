
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  // ✅ Load Todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("Todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // ✅ Save Todos to localStorage whenever Todos state changes
  useEffect(() => {
    if (Todos.length > 0) {  // Prevents storing an empty list on first load
      localStorage.setItem("Todos", JSON.stringify(Todos));
    }
  }, [Todos]);

  const handleAdd = () => {
    if (Todo.trim() === "") return;
    const newTodos = [...Todos, { task: Todo, sCompleted: false }];
    setTodos(newTodos);
    setTodo(""); // Clear input
  };

  const handleDelete = (index) => {
    const newTodos = Todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    const newTask = prompt("Edit your task:", Todos[index].task);
    if (newTask !== null && newTask.trim() !== "") {
      const updatedTodos = [...Todos];
      updatedTodos[index].task = newTask;
      setTodos(updatedTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (index) => {
    const updatedTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, sCompleted: !todo.sCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto items-center my-5 p-5 rounded-2xl bg-amber-100">
        <div className="bg-slate-900 text-white rounded-2xl p-4 min-h-[80vh]">
          <div className="addTodo">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input
              onChange={handleChange}
              value={Todo}
              className="bg-white p-1 rounded-[4px] w-1/2 my-5 text-black max-sm:w-70"
              type="text"
            />
            <button
              onClick={handleAdd}
              className="px-3 py-1 ml-2 hover:font-bold cursor-pointer bg-amber-400 text-black rounded-md"
            >
              Add
            </button>
          </div>

          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="Todos">
            {Todos.length === 0 && (
              <div className="m-5 text-xl text-red-600">No tasks yet</div>
            )}
            {Todos.map((item, index) => (
              <div key={index} className="todo w-1/2  flex justify-between items-center gap-2 my-3 h-full max-sm:w-86">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckbox(index)}
                    checked={item.sCompleted}
                    className="p-2"
                  />
                  <div className={item.sCompleted ? "line-through" : ""}>{item.task}</div>
                </div>
                <div className="btn">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 ml-2 hover:font-bold cursor-pointer bg-amber-400 text-black rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 ml-2 hover:font-bold cursor-pointer bg-amber-400 text-black rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

