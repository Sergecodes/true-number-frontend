import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const ToastContainer: React.FC = () => {
  const toastCtx = useContext(ToastContext);
  if (!toastCtx) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toastCtx.toasts.map(toast => (
        <div key={toast.id} className={
          "px-4 py-3 rounded shadow-md text-white " +
          (toast.type === "success" ? "bg-green-500" :
           toast.type === "error" ? "bg-red-500" :
           "bg-cerulean")
        }>
          {toast.text}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;