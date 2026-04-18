import React, { useState, useEffect } from "react";

type TODOS = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const TodoListLocalStorage = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    let data = {
      id: Math.floor(Math.random() * 10000),
      title: value,
      isCompleted: false,
    };
    setTodos((prev) => [data, ...prev]);

    // local storage logic
    const stored = localStorage.getItem("todos");
    const prevTodos = stored ? JSON.parse(stored) : [];

    // here create a new data with previos data
    const newData = [data, ...prevTodos];
    localStorage.setItem("todos", JSON.stringify(newData));

    setValue("");
  };

  // setting the first render of the localstorage data in the component state
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    const prevTodos = stored ? JSON.parse(stored) : [];
    localStorage.setItem("todos", JSON.stringify(prevTodos));
    setTodos(prevTodos);
  }, []);

  const handleDelete = (id: number) => {
    console.log("id", id);
    setTodos(todos.filter((todo) => todo.id !== id));

    // local storage logic
    const stored = localStorage.getItem("todos");
    const prevTodos: TODOS[] = stored ? JSON.parse(stored) : [];
    console.log("prevTodos", prevTodos);

    localStorage.setItem(
      "todos",
      JSON.stringify(prevTodos?.filter((todo) => todo.id !== id)),
    );
  };

  const handleCompleted = (id: number) => {
    console.log("id", id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );

    // local storage logic
    const stored = localStorage.getItem("todos");
    const prevTodos: TODOS[] = stored ? JSON.parse(stored) : [];

    localStorage.setItem(
      "todos",
      JSON.stringify(
        prevTodos?.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        ),
      ),
    );
  };

  console.log("draggedIndex", draggedIndex);

  return (
    <div>
      <h1 className="text-center text-lg mt-4">
        Todo List with Local Storage Persistence
      </h1>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-2">
            <input
              value={value}
              className="bg-slate-200 outline-none px-2 py-1 border-gray-300 focus:border-red-400 focus:ring-2 rounded-md"
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer">
              ADD
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center">
        <div className="mt-8 w-1/2 ">
          {todos?.map((ele, index) => (
            <div
              className="border px-2 py-4 rounded my-2 flex justify-between "
              key={ele.id}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedIndex === null || draggedIndex === index) return;

                const draggedElement = todos[draggedIndex];
                let updated = [...todos];
                updated.splice(draggedIndex, 1);
                console.log("updated obj => ", updated);
                console.log("draggedElement => ", draggedElement);

                updated.splice(index, 0, draggedElement);

                setTodos(updated);

                localStorage.setItem("todos", JSON.stringify(updated));
              }}
            >
              <span className="font-semibold text-red-400 pr-8">
                {" "}
                {ele.id}{" "}
              </span>{" "}
              <span className={`${ele.isCompleted && "line-through"}`}>
                {" "}
                {ele.title}{" "}
              </span>
              <div className="flex gap-x-2">
                <button
                  className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-full p-1"
                  onClick={() => handleDelete(ele.id)}
                >
                  🗑️
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 cursor-pointer rounded-full p-1"
                  onClick={() => handleCompleted(ele.id)}
                >
                  ✅
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListLocalStorage;
