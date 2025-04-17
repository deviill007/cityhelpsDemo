"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Popup from "@/components/Popup";
import { useRouter } from "next/router";
import LoginPopupContent from "@/components/LoginPopupContent";
import CurrencyPopupContent from "@/components/CurrencyPopupContent";
import { FaArrowRightToCity } from "react-icons/fa6";
import { useToast } from "@/components/ToastContext";
import ResetPasswordPopupContent from "@/components/ResetPasswordPopupContent";


export default function Navigationbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const hoverTimeoutRef = useRef(null);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const cityPanelRef = useRef(null);

  const router = useRouter();
  const showToast = useToast();

  useEffect(() => {
    if (router.pathname === "/reset/[token]") {
      setPopupType("reset-password");
    }
  }, [router.pathname]);

  // Load user from cookie on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me"); // Create this route
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;

      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        iconRef.current &&
        !iconRef.current.contains(target)
      ) {
        setPanelOpen(false);
      }

      // Close popup
      if (popupType) {
        const popup = document.querySelector(".popup");
        if (popup && !popup.contains(target)) {
          setPopupType(null);
        }
      }

      if (
        cityPanelRef.current &&
        !cityPanelRef.current.contains(target) &&
        target.closest(".city-selector") === null
      ) {
        setCityDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupType]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setPanelOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setPanelOpen(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      // Show loading toast (spinner visible, no progress bar)
      showToast({
        message: "Logging out...",
        type: "loading",
        isLoading: true
      });
  
      await fetch("/api/auth/logout", { method: "POST" });
      
      // Show success toast (progress bar will start)
      showToast({
        message: "Logged out successfully",
        type: "success",
        isLoading: false
      });
  
      setUser(null);
      setPopupType(null);
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
      showToast({
        message: "Logout failed. Please try again.",
        type: "error",
        isLoading: false
      });
    }
  };

  return (
    <div className="navbar">
      <div className="logo">CityHelps</div>

      <div className="first">
        <div
          className="city-selector"
          onClick={() => setCityDropdownOpen((prev) => !prev)}
        >
          <span>Jaipur</span>
          <Image
            height={10}
            width={10}
            src="/icons/drop-down.png"
            alt="cart icon"
          />
        </div>

        {cityDropdownOpen && (
          <div className="city-dropdown-panel" ref={cityPanelRef}>
            <div className="city-option selected">
              <FaArrowRightToCity className="city-icon" /> Jaipur
            </div>
            <div className="city-option disabled">
              <FaArrowRightToCity className="city-icon" /> Udaipur (Coming Soon)
            </div>
            <div className="city-option disabled">
              <FaArrowRightToCity className="city-icon" /> Jaisalmer (Coming
              Soon)
            </div>
            <div className="city-option disabled">
              <FaArrowRightToCity className="city-icon" /> Delhi (Coming Soon)
            </div>
            <hr />
            <div className="city-option">Become a Partner</div>
          </div>
        )}

        <div className="last">
          <Link href="/#">Explore</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/support">Support</Link>

          <Link href="/cart">
            <div className="user-icon">
              <Image
                height={20}
                width={20}
                src="/icons/shopping-cart.png"
                alt="cart icon"
              />
              <div className="username">Cart</div>
            </div>
          </Link>

          <div className="user-wrapper">
            <div
              className="user-icon"
              ref={iconRef}
              onMouseEnter={handleMouseEnter}
              onClick={() => setPanelOpen((prev) => !prev)}
            >
              <Image
                height={50}
                width={50}
                src="/icons/user.png"
                alt="user icon"
              />
              <div className="username">
                {user?.name?.split(" ")[0] || "Profile"}
              </div>
            </div>

            {panelOpen && (
              <div
                className="user-panel"
                ref={panelRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="header">Profile</div>

                {user ? (
                  <div className="profile-option line" onClick={handleLogout}>
                    <div className="option-left">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/login.png"
                        alt="logout icon"
                      />
                      <span>Logout</span>
                    </div>
                    <div className="option-right">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                ) : (
                  <div
                    className="profile-option line"
                    onClick={() => setPopupType("login")}
                  >
                    <div className="option-left">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/login.png"
                        alt=""
                      />
                      <span>Log in / Sign up</span>
                    </div>
                    <div className="option-right">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                )}

                {user && (
                  <div className="profile-option">
                    <div className="option-left">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/user.png"
                        alt="profile icon"
                      />
                      <span>Profile</span>
                    </div>
                    <div className="option-right">
                      <Image
                        height={50}
                        width={50}
                        className="image2"
                        src="/icons/next.png"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                <div
                  className="profile-option"
                  onClick={() => setPopupType("currency")}
                >
                  <div className="option-left">
                    <Image
                      height={50}
                      width={50}
                      className="image1"
                      src="/icons/currency.png"
                      alt=""
                    />
                    <span>Currency</span>
                  </div>
                  <div className="option-right">
                    INR
                    <Image
                      height={50}
                      width={50}
                      className="image2"
                      src="/icons/next.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Popup isOpen={!!popupType} onClose={() => setPopupType(null)}>
        {popupType === "login" && (
          <LoginPopupContent
          onLoginSuccess={(userData) => {
            console.log("Logged in:", userData);
            fetch("/api/auth/me")          
                .then((res) => res.json())
                .then((data) => {
                  setUser(data.user);
                  setPopupType(null);
                })
                .catch(console.error);
            }}
          />
        )}
        {popupType === "currency" && <CurrencyPopupContent />}
        {popupType === "reset-password" && (
          <ResetPasswordPopupContent onClose={() => setPopupType(null)} />
        )}
      </Popup>
    </div>
  );
}
