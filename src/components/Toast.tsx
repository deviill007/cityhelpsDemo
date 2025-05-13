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
    if (isLoading || !shouldStartProgress || isHovered) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return p - 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onClose, isHovered, isLoading, shouldStartProgress]);

  useEffect(() => {
    if (!isLoading) {
      setShouldStartProgress(true);
    }
  }, [isLoading]);

  const textColor = {
    success: "#28a745",
    error: "#dc3545",
    info: "#007bff",
    loading: "#6c757d",
  };

  const progressColor = {
    success: "#28a745",
    error: "#dc3545",
    info: "#007bff",
    loading: "#adb5bd",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "500px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "16px 20px",
        boxShadow: `
          8px 8px 20px #d1d9e6,
          -8px -8px 20px #ffffff
        `,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isLoading && (
            <ClipLoader size={18} color={textColor[type]} loading={isLoading} />
          )}
          <p
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: "1rem",
              color: "#333",
            }}
          >
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "#ffffff",
            border: "none",
            color: "#888",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: `
              3px 3px 6px #d1d9e6,
              -3px -3px 6px #ffffff
            `,
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = textColor[type])
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#888")
          }
        >
          &times;
        </button>
      </div>

      {/* Progress Bar */}
      {shouldStartProgress && (
        <div
          style={{
            marginTop: "12px",
            height: "6px",
            width: "100%",
            borderRadius: "8px",
            background: "#e0e5ec",
            boxShadow: "inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: progressColor[type],
              borderRadius: "8px",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      )}
    </div>
  );
}
