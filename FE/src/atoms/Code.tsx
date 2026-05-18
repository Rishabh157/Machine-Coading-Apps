import React from "react";

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-slate-300 text-xs px-1 rounded">{children}</code>
);

export default Code;
