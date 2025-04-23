import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Toast({
  type = "info",
  message,
  onClose,
  isLoading = false,
}: {
  type: "success" | "error" | "info" | "loading";
  message: string;
  onClose: () => void;
  isLoading?: boolean;
}) {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldStartProgress, setShouldStartProgress] = useState(!isLoading);

  useEffect(() => {
    // If it's loading, don't start progress
    if (isLoading || !shouldStartProgress) return;

    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return p - 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onClose, isHovered, isLoading, shouldStartProgress]);

  // When loading state changes to false, start the progress
  useEffect(() => {
    if (!isLoading) {
      setShouldStartProgress(true);
    }
  }, [isLoading]);

  const bgColor = {
    success: "#d4edda",
    error: "#f8d7da",
    info: "#cce5ff",
    loading: "#e2e3e5",
  };

  const textColor = {
    success: "#155724",
    error: "#721c24",
    info: "#004085",
    loading: "#383d41",
  };

  const progressColor = {
    success: "#28a745",
    error: "#dc3545",
    info: "#007bff",
    loading: "#6c757d",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: bgColor[type],
        color: textColor[type],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 9999,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        flexDirection: "column",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {shouldStartProgress && (
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: progressColor[type],
            transform: `translateX(-${100 - progress}%)`,
            transition: "transform 0.1s linear",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        maxWidth: "600px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isLoading && (
            <ClipLoader
              size={18}
              color={textColor[type]}
              loading={isLoading}
            />
          )}
          <p style={{ margin: 0, fontWeight: 600 }}>{message}</p>
        </div>
        <button className="close-popup" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}