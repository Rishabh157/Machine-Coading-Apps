import { useState } from "react";
import Code from "../atoms/Code";

enum OperationType {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  RESET = "RESET",
}

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  const handleOpration = (type: OperationType) => {
    switch (type) {
      case OperationType.INCREMENT:
        setCounter((prev) => prev + 1);
        break;
      case OperationType.DECREMENT:
        setCounter((prev) => prev - 1);
        break;
      case OperationType.RESET:
        setCounter(0);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h1 className="text-center text-lg">
        <span className="bg-green-400 px-2 py-0.5 rounded">
          Build a Counter with Increment/Decrement/Reset
        </span>
        <br />
        <button
          onClick={() => handleOpration(OperationType.RESET)}
          className="bg-blue-300 mt-3 px-2 py-0.5 rounded focus:ring-1 focus:bg-blue-400 cursor-pointer"
        >
          RESET
        </button>
      </h1>

      <div className="mt-8">
        <div className="flex gap-x-14">
          <button
            onClick={() => handleOpration(OperationType.INCREMENT)}
            className="bg-green-300 px-2 py-0.5 rounded focus:ring-1 focus:bg-green-400 cursor-pointer"
          >
            Increment +
          </button>

          <h2>COUNT : {counter}</h2>

          <button
            onClick={() => handleOpration(OperationType.DECREMENT)}
            className="bg-red-300 px-2 py-0.5 rounded focus:ring-1 focus:bg-red-400 cursor-pointer"
          >
            Decrement -{" "}
          </button>
        </div>
      </div>

      <div className="mt-12">
        <p className="font-bold">LEARNING</p>
        <ul className="list-decimal">
          <li>
            {" "}
            How to use Switch case - never use the <Code>return</Code> keyword
            inside the <Code>switch</Code> insted of use <Code>break</Code>{" "}
            keywrok{" "}
          </li>
          <li>
            Learned How to Define a <Code>Enum</Code> in <Code>Typescript</Code>
          </li>
          <li>
            Noted in mind why we use setter funtion like this in React - if we
            want the updated value from the react <br /> then should use the{" "}
            <Code>prev</Code> from the setter function that react guarantee it
            will give us the updated value
          </li>
          <li>
            It took me <Code>16:56:31</Code> MM:SS:MS
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Counter;
