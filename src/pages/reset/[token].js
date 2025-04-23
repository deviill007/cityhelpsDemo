// pages/reset/[token].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import ResetPasswordPopupContent from "../../components/ResetPasswordPopupContent";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [tokenValid, setTokenValid] = useState(null); // null | true | false
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/auth/verify-reset-token?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token is valid") {
          setTokenValid(true);
          setIsPopupOpen(true);
        } else {
          setTokenValid(false);
        }
      });
  }, [token]);

  if (tokenValid === false) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Invalid or expired link.</p>;
  }

  return (
    <>
      <Popup isOpen={isPopupOpen} onClose={() => router.push("/")}>
        {token && <ResetPasswordPopupContent onClose={() => router.push("/")} />}
      </Popup>
    </>
  );
}
