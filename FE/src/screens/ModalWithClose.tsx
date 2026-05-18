import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalWithClose = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <h1 className="text-center text-lg mt-4">
        Build a Modal Component (with backdrop & ESC close)
      </h1>

      <div className="flex justify-center items-center h-100">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-blue-400 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-blue-500 focus:ring-1 ring-blue-500"
        >
          Open
        </button>
      </div>

      {open &&
        createPortal(
          <ModalWithESCClose children={<div></div>} onClose={() => setOpen(false)} />,
          document.body,
        )}
    </div>
  );
};

export function ModalWithESCClose({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("e", e);
        onClose();
      }
    };

    window.addEventListener("keydown", handleESC);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleESC);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative z-50 shadow bg-slate-100 rounded-xl h-[50vh] overflow-auto w-[35%] p-6 flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 bg-slate-200 hover:bg-slate-300 cursor-pointer p-1 rounded-full"
        >
          ❌
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithClose;
