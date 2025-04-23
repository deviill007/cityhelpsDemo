import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import ClipLoader from "react-spinners/ClipLoader";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/components/ToastContext";


type Props = {
  onClose?: () => void;
  onLoginSuccess?: (user: { name: string; email: string }) => void;
};

export default function LoginPopupContent({ onClose, onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [cooldown, setCooldown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [isResetRequesting, setIsResetRequesting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  const router = useRouter();
  const showToast = useToast();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const checkGoogle = () => {
      if (window.google?.accounts) {
        setGoogleScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (!checkGoogle()) {
      const timer = setInterval(() => {
        if (checkGoogle()) {
          clearInterval(timer);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (!password) return setPasswordStrength("");
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const mediumRegex = /^.{6,}$/;
    if (strongRegex.test(password)) setPasswordStrength("Strong");
    else if (mediumRegex.test(password)) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  }, [password]);

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrors({});
    if (!email.includes("@")) {
      return setErrors({ email: "Enter a valid email" });
    }

    setIsLoginLoading(true);
    try {
      const res = await fetch("/api/auth/checkEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.exists && data.provider === "google") {
        return setErrors({
          email:
            "This email is registered with Google. Please continue with Google login.",
        });
      }

      if (!data.exists) {
        setIsNewUser(true); // ✅ First time user
        await sendOtp();
      } else if (data.exists && !data.validated) {
        setIsNewUser(true); // ✅ Account exists but not validated
        await sendOtp();
      } else if (data.exists && data.validated) {
        setIsNewUser(false); // ✅ Already validated user
        setIsValidated(true);
      }
    } catch (error) {
      console.log(error)
      setErrors({ email: "Something went wrong while checking email." });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const sendOtp = async () => {
    if (cooldown > 0) return;
    setIsOtpLoading(true);
    try {
      const res = await fetch("/api/auth/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.message === "OTP sent successfully") {
        setIsOtpSent(true);
        setCooldown(30);
      } else if (data.validated) {
        setIsValidated(true);
        setIsNewUser(false);
      } else {
        setErrors({ otp: data.message });
      }
    } catch (error) {
      console.log(error)
      setErrors({ otp: "Failed to send OTP." });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setIsOtpVerifying(true);
    try {
      const res = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.validated) {
        setIsValidated(true);
      } else {
        setErrors({ otp: data.message });
      }
    } catch (error) {
      console.log(error)
      setErrors({ otp: "Failed to verify OTP." });
    } finally {
      setIsOtpVerifying(false);
    }
  };
  type LoginErrors = {
    password?: string;
    name?: string;
    phone?: string;
  };
  const handleLogin = async () => {
    const errs: LoginErrors = {};
    if (!password) errs.password = "Password is required";
    if (isNewUser && passwordStrength === "Weak")
      errs.password = "Password too weak";
  
    if (isNewUser) {
      if (!name) errs.name = "Name is required";
      if (!phone) errs.phone = "Phone is required";
    }
  
    if (Object.keys(errs).length) {
      // Show error toast for validation errors
      const firstError = Object.values(errs)[0] as string;
      showToast({
        message: firstError,
        type: "error",
        isLoading: false
      });
      return setErrors(errs);
    }
  
    setIsLoginLoading(true);
    // Show loading toast
    showToast({
      message: "Logging in...",
      type: "loading",
      isLoading: true
    });
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(isNewUser && { name, phone }),
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      // Show success toast
      showToast({
        message: "Login successful!",
        type: "success",
        isLoading: false
      });
  
      const data = await res.json();
      onLoginSuccess?.(data.user);
      onClose?.();
      
      const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectTo);
    } catch (error) {
      console.log(error)
      const errorMessage = (error as Error).message;
      setErrors({ password: errorMessage });
      // Show error toast
      showToast({
        message: errorMessage,
        type: "error",
        isLoading: false
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleLogin = async () => {
    setGoogleError("");
    setIsGoogleLoading(true);
    // Show loading toast immediately
    showToast({
      message: "Connecting to Google...",
      type: "loading",
      isLoading: true
    });
  
    try {
      if (!window.google?.accounts) {
        throw new Error("Google services not loaded. Please refresh the page.");
      }
  
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: { credential: string }) => {
          try {
            // Update toast to indicate authentication in progress
            showToast({
              message: "Authenticating with Google...",
              type: "loading",
              isLoading: true
            });
  
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            });
  
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(
                errorData.message || "Google authentication failed"
              );
            }
  
            // Show success toast
            showToast({
              message: "Google login successful!",
              type: "success",
              isLoading: false
            });
  
            const data = await res.json();
            onLoginSuccess?.(data.user);
            onClose?.();
            router.push(localStorage.getItem("redirectAfterLogin") || "/");
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Authentication failed";
            setGoogleError(errorMessage);
            // Show error toast
            showToast({
              message: errorMessage,
              type: "error",
              isLoading: false
            });
          } finally {
            setIsGoogleLoading(false);
          }
        },
      });
  
      // Show Google's invisible button
      if (googleButtonRef.current) {
        googleButtonRef.current.style.display = "block";
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: "icon",
          theme: "outline",
          size: "large",
        });
        const googleButton = googleButtonRef.current.querySelector("div[role=button]");
        if (googleButton) (googleButton as HTMLElement).click();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load Google services";
      setGoogleError(errorMessage);
      // Show error toast
      showToast({
        message: errorMessage,
        type: "error",
        isLoading: false
      });
      setIsGoogleLoading(false);
    }
  };


  const handleResetPasswordRequest = async ({ autoRedirect = false } = {}) => {
    setErrors({});
    setResetSuccessMessage("");
  
    if (!email.includes("@")) {
      const errorMsg = "Please enter a valid email address.";
      setErrors({ email: errorMsg });
      showToast({
        message: errorMsg,
        type: "error",
        isLoading: false // Not loading, so progress will start immediately
      });
      return;
    }
  
    setIsResetRequesting(true);
  
    // Show loading toast (no progress bar)
    showToast({
      message: "Sending password reset link...",
      type: "loading",
      isLoading: true
    });
  
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      const successMsg = "Password reset link sent! Check your email.";
      setResetSuccessMessage(successMsg);
      // Change to success state (progress will start now)
      showToast({
        message: successMsg,
        type: "success",
        isLoading: false
      });
  
      if (autoRedirect) {
        setTimeout(() => {
          setIsForgotPasswordMode(false);
          setEmail("");
          setResetSuccessMessage("");
        }, 3000);
      }
  
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setErrors({ email: errorMessage });
      // Change to error state (progress will start now)
      showToast({
        message: errorMessage,
        type: "error",
        isLoading: false
      });
    } finally {
      setIsResetRequesting(false);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login">
        {isForgotPasswordMode ? "Reset your password" : "Log in or sign up"}
      </h2>
      <p className="login-p">
        {isForgotPasswordMode
          ? "We'll send you a link to reset your password."
          : "Check out more easily and access your tickets on any device with your CityHelps account."}
      </p>
  
      {isForgotPasswordMode ? (
        <>
          {resetSuccessMessage ? (
            <p className="success-text">{resetSuccessMessage}</p>
          ) : (
            <>
              <input
                placeholder="Enter your email"
                className="input-style"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
              <button
                className="btn-login"
                onClick={() => handleResetPasswordRequest()}
                disabled={isResetRequesting || !email}
              >
                {isResetRequesting ? (
                  <ClipLoader size={18} color="#fff" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </>
          )}
          <button
            className="btn-secondary"
            onClick={() => {
              setIsForgotPasswordMode(false);
              setResetSuccessMessage("");
              setErrors({});
            }}
          >
            Back to Login
          </button>
        </>
      ) : (
        <>
          {/* === Google Login === */}
          <div className="google-button-container">
            <button
              className="btn-google"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || !googleScriptLoaded}
            >
              {isGoogleLoading ? (
                <ClipLoader size={18} color="#000" />
              ) : (
                <>
                  <FcGoogle size={22} style={{ marginRight: "8px" }} />
                  Continue with Google
                </>
              )}
            </button>
            <div
              id="google-signin-button"
              style={{ display: "none" }}
              ref={googleButtonRef}
            />
          </div>
          {googleError && <p className="error-text">{googleError}</p>}
  
          {/* === Login / OTP / Register === */}
          {!isOtpSent && !isValidated && (
            <>
              <input
                placeholder="Email"
                className="input-style"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEmailSubmit();
                  }
                }}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
  
              <button
                className="btn-login"
                onClick={handleEmailSubmit}
                disabled={isLoginLoading || !email}
              >
                {isLoginLoading ? (
                  <ClipLoader size={18} color="#fff" />
                ) : (
                  "Continue with Email"
                )}
              </button>
            </>
          )}
  
          {isOtpSent && !isValidated && (
            <>
              <input
                placeholder="Enter OTP"
                className="input-style"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOtpVerify();
                  }
                }}
              />
              {errors.otp && <p className="error-text">{errors.otp}</p>}
              <button
                className="btn-login"
                onClick={handleOtpVerify}
                disabled={isOtpVerifying || !otp}
              >
                {isOtpVerifying ? (
                  <ClipLoader size={18} color="#fff" />
                ) : (
                  "Verify OTP"
                )}
              </button>
              <button
                className="btn-secondary"
                onClick={sendOtp}
                disabled={cooldown > 0 || isOtpLoading}
              >
                {isOtpLoading ? (
                  <ClipLoader size={16} color="#000" />
                ) : cooldown > 0 ? (
                  `Resend OTP in ${cooldown}s`
                ) : (
                  "Resend OTP"
                )}
              </button>
            </>
          )}
  
          {isValidated && (
            <>
              {isNewUser && (
                <>
                  <input
                    placeholder="Name"
                    className="input-style"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                  <input
                    placeholder="Phone"
                    className="input-style"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </>
              )}
              <div className="relative">
                <input
                  placeholder="Password"
                  className="input-style"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </span>
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>
              {!isNewUser && (
                <div className="button-container">
                  <button
                    className="btn-forgotPassword"
                    onClick={() => {
                      setIsForgotPasswordMode(true);
                      setErrors({});
                      setResetSuccessMessage("");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
              <button
                className="btn-login"
                onClick={handleLogin}
                disabled={
                  isLoginLoading || !password || (isNewUser && (!name || !phone))
                }
              >
                {isLoginLoading ? (
                  <ClipLoader size={18} color="#fff" />
                ) : (
                  "Login"
                )}
              </button>
            </>
          )}
          <p className="login-p-down">
            By signing in or creating an account, you accept our{" "}
            <span>Terms and Conditions</span> and <span>Privacy Policy</span>.
          </p>
        </>
      )}
    </div>
  );
  
}
