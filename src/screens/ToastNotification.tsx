import { useEffect, useState } from "react";
import { createPortal, preconnect } from "react-dom";

enum ToastType {
  success = "SUCCESS",
  info = "INFO",
  warning = "WARNING",
  error = "ERROR",
}

const ToastNotification = () => {
  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
  }>({
    open: false,
    type: ToastType.success,
  });

  const showToast = (type: ToastType) => {
    setToast({ open: true, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };
  return (
    <div>
      <h1 className="text-center text-lg mt-4">
        Build a Toast Notification System
      </h1>

      <div className="flex justify-center items-center gap-x-2 h-100">
        <button
          onClick={() => showToast(ToastType.success)}
          className="bg-green-400 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-green-500 focus:ring-1 ring-green-500"
        >
          SUCCESS
        </button>
        <button
          onClick={() => showToast(ToastType.info)}
          className="bg-blue-400 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-blue-500 focus:ring-1 ring-blue-500"
        >
          INFO
        </button>

        <button
          onClick={() => showToast(ToastType.warning)}
          className="bg-yellow-400 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-yellow-500 focus:ring-1 ring-yellow-500"
        >
          WARNING
        </button>

        <button
          onClick={() => showToast(ToastType.error)}
          className="bg-red-400 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-red-500 focus:ring-1 ring-red-500"
        >
          ERROR
        </button>
      </div>

      {toast.open &&
        createPortal(
          <ToasterUI type={toast.type} onClose={() => closeToast()} />,
          document.body,
        )}
    </div>
  );
};

function ToasterUI({
  type,
  onClose,
}: {
  type: ToastType;
  onClose: () => void;
}) {
  // get style dynamically
  const getStyles = () => {
    switch (type) {
      case ToastType.success:
        return "bg-green-400";
      case ToastType.info:
        return "bg-blue-400";
      case ToastType.warning:
        return "bg-yellow-400";
      case ToastType.error:
        return "bg-red-400";
    }
  };

  const getTitle = () => type;

  useEffect(() => {
    const handleCloseEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleCloseEsc);

    return () => {
      window.removeEventListener("keydown", handleCloseEsc);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/20">
      <div
        className={`absolute top-3 right-3 w-fit transition-all duration-500 translate-y-2 ${getStyles()} p-2 rounded-xl flex items-center gap-x-4 `}
      >
        <div> ✅ </div>
        <div>
          <h1 className="font-bold text-white">{getTitle()}</h1>
          <p className="text-sm text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
        <button onClick={onClose} className="cursor-pointer">
          ❌
        </button>
      </div>
    </div>
  );
}

export default ToastNotification;
