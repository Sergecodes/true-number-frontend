import React, { createContext, useState, useEffect } from "react";

export interface ToastMessage { id: number; text: string; type?: "info"|"success"|"error"; }
interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (text: string, type?: "info"|"success"|"error") => void;
}

export const ToastContext = createContext<ToastContextType|null>(null);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: "info"|"success"|"error" = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
