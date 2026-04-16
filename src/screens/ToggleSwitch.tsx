import { useState } from "react";

const ToggleSwitch = () => {
  const [active, setActive] = useState<boolean>(false);

  const handleChange = () => {
    setActive((prev) => !prev);
  };

  console.log("active", active);

  return (
    <div>
      <h1 className="text-center text-lg mt-4">
        Build a Toggle Switch Component
      </h1>
      <div className="flex justify-center mt-10">
        <div className="relative h-10 bg-green-500 w-20 rounded-full flex items-center gap-x-1 px-2 py-2 ">
          <span
            className={`text-white font-bold select-none absolute ${active ? "right-2" : "left-2"} `}
          >
            {!active ? "YES" : "NO"}
          </span>

          <div
            onClick={handleChange}
            className={`absolute h-8 w-8 rounded-full bg-white cursor-pointer transition-all duration-300 ${
              active ? "translate-x-0" : "translate-x-8"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
