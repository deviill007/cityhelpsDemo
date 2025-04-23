import { createContext, useContext, useState } from "react";
import Toast from "@/components/Toast";

type ToastData = {
  message: string;
  type: "success" | "error" | "info" | "loading";
  isLoading?: boolean;
};

const ToastContext = createContext<(toast: ToastData) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToastState] = useState<ToastData | null>(null);

  const showToast = (data: ToastData) => {
    setToastState(data);
  };

  const hideToast = () => setToastState(null);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
          isLoading={toast.isLoading}
        />
      )}
    </ToastContext.Provider>
  );
};