// components/ResetPasswordPopupContent.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

export default function ResetPasswordPopupContent({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // 👉 Verify reset token
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        if (!res.ok) throw new Error("Invalid token");
      } catch {
        setStatus("invalid");
      }
    };
    if (token) verify();
  }, [token]);

  // 👉 Password strength checker
  useEffect(() => {
    if (!newPassword) return setPasswordStrength("");
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const mediumRegex = /^.{6,}$/;
    if (strongRegex.test(newPassword)) setPasswordStrength("Strong");
    else if (mediumRegex.test(newPassword)) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  }, [newPassword]);

  // 👉 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setError("Please fill both fields.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          router.push("/");
        }, 1500);
      } else {
        const data = await res.json();
        setStatus("error");
        setError(data.message || "Failed to reset password.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong.");
    }
  };

  if (status === "invalid") return <div>Invalid or expired token</div>;

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Reset Your Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="input-style"
        />

        {/* 💬 Strength label */}
        {passwordStrength && (
          <p
            style={{
              marginTop: "6px",
              marginBottom: "10px",
              color:
                passwordStrength === "Strong"
                  ? "green"
                  : passwordStrength === "Medium"
                  ? "orange"
                  : "red",
            }}
          >
            Strength: {passwordStrength}
          </p>
        )}

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-style"
        />

        <button
          type="submit"
          className="btn-login"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <ClipLoader size={18} color="#fff" />
          ) : (
            "Reset Password"
          )}
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {status === "success" && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Password reset successful! Redirecting...
          </p>
        )}
      </form>
    </div>
  );
}
