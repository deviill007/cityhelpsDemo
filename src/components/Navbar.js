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
import { useAuth } from "@/contexts/AuthContext";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import {
  FiX,
  FiUser,
  FiShoppingCart,
  FiLogIn,
  FiLogOut,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";

export default function Navigationbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openedByHover = useRef(false);
  const hoverTimeoutRef = useRef(null);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const cityPanelRef = useRef(null);
  const { user, setUser, logout } = useAuth();
  const router = useRouter();
  const showToast = useToast();

  useEffect(() => {
    if (router.pathname === "/reset/[token]") {
      setPopupType("reset-password");
    }
  }, [router.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconRef.current?.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setPanelOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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
    openedByHover.current = true;
    clearTimeout(hoverTimeoutRef.current);
    setPanelOpen(true);
  };

  const handleMouseLeave = () => {
    openedByHover.current = false;
    hoverTimeoutRef.current = setTimeout(() => {
      setPanelOpen(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      showToast({
        message: "Logging out...",
        type: "loading",
        isLoading: true,
      });

      await logout();

      showToast({
        message: "Logged out successfully",
        type: "success",
        isLoading: false,
      });

      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
      showToast({
        message: "Logout failed. Please try again.",
        type: "error",
        isLoading: false,
      });
    }
  };

  return (
    <div className="navbar">
      <div className="logo">CityHelps</div>

      <button
        className="menu-button"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <HiOutlineMenuAlt1 size={24} />}
      </button>

      <div className="first desktop-menu">
      <div className="city-selector-wrapper">
                    <div
              className="city-selector"
              onClick={() => setCityDropdownOpen((prev) => !prev)}
            >
              <span>Jaipur</span>
              <div className={`dropdown-arrow ${cityDropdownOpen ? "open" : ""}`}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
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
                  <FaArrowRightToCity className="city-icon" /> Jaisalmer (Coming Soon)
                </div>
                <div className="city-option disabled">
                  <FaArrowRightToCity className="city-icon" /> Delhi (Coming Soon)
                </div>
                <div className="divider" />
                <div className="city-option partner">Become a Partner</div>
              </div>
            )}</div>

        <div className="last">
          <Link href="/#">Explore</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/support">Support</Link>

          <Link href="/cart">
            <div className="user-icon">
              <FiShoppingCart size={20} />
            </div>
          </Link>

          <div className="user-wrapper">
            <div
              className="user-icon"
              ref={iconRef}
              onMouseEnter={handleMouseEnter}
              onClick={() => setPanelOpen((prev) => !prev)}
            >
              <FiUser size={20} />
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
                      <FiLogOut size={20} />
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
                      <FiLogIn size={20} />
                      <span>Log in / Sign up</span>
                    </div>
                    <div className="option-right">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                )}

                {user && (
                  <div
                    className="profile-option"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    <div className="option-left">
                      <FiUser size={20} />
                      <span>Profile</span>
                    </div>
                    <div className="option-right">
                      <Image
                        height={1000}
                        width={1000}
                        className="image2"
                        src="/icons/next.png"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                {user && (
                  <div
                    className="profile-option"
                    onClick={() => {
                      router.push("/bookings");
                    }}
                  >
                    <div className="option-left">
                      <FiClock size={20} />
                      <span>My Bookings</span>
                    </div>
                    <div className="option-right">
                      <Image
                        height={1000}
                        width={1000}
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
                    <FiDollarSign size={20} />
                    <span>Currency</span>
                  </div>
                  <div className="option-right">
                    INR
                    <Image
                      height={1000}
                      width={1000}
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

      {isMobileMenuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <Link href="/#" onClick={() => setIsMobileMenuOpen(false)}>
            Explore
          </Link>
          <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <Link href="/articles" onClick={() => setIsMobileMenuOpen(false)}>
            Articles
          </Link>
          <Link href="/support" onClick={() => setIsMobileMenuOpen(false)}>
            Support
          </Link>
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="user-icon">
             <FiShoppingCart size={20} />
            </div>
          </Link>
          <div className="user-wrapper">
            <div
              className="user-icon"
              ref={iconRef}
              onMouseEnter={handleMouseEnter}
              onClick={() => {
                if (!openedByHover.current) {
                  setPanelOpen((prev) => !prev);
                }
              }}
            >
              <FiUser size={20} />
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
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </div>
                    <div className="option-right">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                ) : (
                  <div
                    className="profile-option line"
                    onClick={() => {
                      setPopupType("login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="option-left">
                      <FiLogIn size={20} />
                      <span>Log in / Sign up</span>
                    </div>
                    <div className="option-right">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                )}

                {user && (
                  <div
                    className="profile-option"
                    onClick={() => {
                      router.push("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="option-left">
                      <FiUser size={20} />
                      <span>Profile</span>
                    </div>
                    <div className="option-right">
                      <Image
                        height={1000}
                        width={1000}
                        className="image2"
                        src="/icons/next.png"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                {user && (
                  <div
                    className="profile-option"
                    onClick={() => {
                      router.push("/bookings");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="option-left">
                      <FiClock size={20} />
                      <span>My Bookings</span>
                    </div>
                    <div className="option-right">
                      <Image
                        height={1000}
                        width={1000}
                        className="image2"
                        src="/icons/next.png"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                <div
                  className="profile-option"
                  onClick={() => {
                    setPopupType("currency");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="option-left">
                    <FiDollarSign size={20} />
                    <span>Currency</span>
                  </div>
                  <div className="option-right">
                    INR
                    <Image
                      height={1000}
                      width={1000}
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
      )}

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
