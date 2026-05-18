import { useState } from "react";

interface TODOS {
  id: number;
  title: string;
  isCompleted: boolean;
}

function Todo() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      id: Math.floor(Math.random() * Math.pow(4, 7)),
      title: value,
      isCompleted: false,
    };

    setTodos((prev) => [payload, ...prev]);
    setValue("");

    console.log("todos", todos, value);
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((ele) => ele.id !== id));
  };

  const handleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((ele) => {
        return {
          ...ele,
          isCompleted: ele.id === id ? !ele.isCompleted : false,
        };
      }),
    );
  };

  // console.log(
  //   "draggedIndex",
  //   todos?.find((ele) => ele.id === draggedIndex)?.title,
  //   draggedIndex,
  // );

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex gap-x-4">
          <input
            value={value}
            placeholder="Enter a text"
            className="border outline-none focus:border-blue-400 rounded px-2 py-1.5"
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="px-2 py-1.5 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded">
            Submit
          </button>
        </form>
      </div>

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

              setTodos((prev) => {
                const updatedTodo = [...prev];

                const draggedItem = updatedTodo[draggedIndex];

                // remove
                updatedTodo.splice(draggedIndex, 1);

                // updated
                updatedTodo.splice(index, 0, draggedItem);

                return updatedTodo;
              });
              setDraggedIndex(null);
            }}
          >
            <span className="font-semibold text-red-400 pr-8"> {ele.id} </span>{" "}
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
  );
}

export default Todo;
