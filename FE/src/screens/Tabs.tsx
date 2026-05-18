import { useState } from "react";

const tabs = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>();
  return (
    <div>
      <h1 className="text-center text-lg mt-4">Build a Tabs Component</h1>

      <div className="bg-slate-200 p-2 rounded flex justify-center gap-x-2">
        {tabs?.map((tab) => (
          <div
            key={tab.name}
            className={`hover:bg-slate-400 p-2 rounded cursor-pointer transition-all ${tab.name === activeTab ? "bg-slate-400" : ""}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
