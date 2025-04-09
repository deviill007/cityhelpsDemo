'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigationbar() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [currencyPopupOpen, setCurrencyPopupOpen] = useState(false);
    const hoverTimeoutRef = useRef(null);
    const panelRef = useRef(null);
    const iconRef = useRef(null);
    const currencyRef = useRef(null);
    const currencyPopupRef = useRef(null);

    // Disable scroll when popup is open
    useEffect(() => {
        if (currencyPopupOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [currencyPopupOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            const target = event.target;

            // Close user panel if click outside
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                iconRef.current &&
                !iconRef.current.contains(target)
            ) {
                setPanelOpen(false);
            }

            // Close currency popup if click outside
            if (
                currencyPopupOpen &&
                currencyPopupRef.current &&
                !currencyPopupRef.current.contains(target) &&
                currencyRef.current &&
                !currencyRef.current.contains(target)
            ) {
                setCurrencyPopupOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currencyPopupOpen]);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeoutRef.current);
        setPanelOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setPanelOpen(false);
        }, 500);
    };

    return (
        <div className="navbar">
            <div className="first">
                <Link href="/#">Explore</Link>
                <Link href="/testimonials">Testimonials</Link>
            </div>
            <div className="logo">CityHelps</div>
            <div className="last">
                <Link href="/articles">Articles</Link>
                <Link href="/support">Support</Link>

                <div className="user-wrapper">
                    <div
                        className="user-icon"
                        ref={iconRef}
                        onMouseEnter={handleMouseEnter}
                        onClick={() => setPanelOpen(prev => !prev)}
                    >
                        <Image height={50} width={50} src="/icons/user.png" alt="user icon" />
                    </div>

                    {panelOpen && (
                        <div
                            className="user-panel"
                            ref={panelRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="header">Profile</div>

                            <div className="profile-option line">
                                <div className="option-left">
                                    <Image height={50} width={50} className="image1" src="/icons/login.png" alt="" />
                                    <span>Log in / Sign up</span>
                                </div>
                                <div className="option-right">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>

                            <div
                                className="profile-option"
                                ref={currencyRef}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrencyPopupOpen(prev => !prev);
                                }}
                            >
                                <div className="option-left">
                                    <Image height={50} width={50} className="image1" src="/icons/currency.png" alt="" />
                                    <span>Currency</span>
                                </div>
                                <div className="option-right">
                                    INR
                                    <Image height={50} width={50} className="image2" src="/icons/next.png" alt="" />
                                </div>

                                {currencyPopupOpen && (
                                    <div className="popup-overlay">
                                        <div
                                            className="popup"
                                            ref={currencyPopupRef}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                className="close-popup"
                                                onClick={() => setCurrencyPopupOpen(false)}
                                            >
                                                &times;
                                            </button>

                                            <div className="currency-grid-top">
                                                <div className="currency-item selected">Indian Rupee ₹ ✓</div>
                                                <div className="currency-item">Euro €</div>
                                                <div className="currency-item">U.S. Dollar $</div>
                                                <div className="currency-item">British Pound £</div>
                                                <div className="currency-item">Australian Dollar A$</div>
                                                <div className="currency-item">Swiss Franc CHF</div>
                                            </div>

                                            <p className="section-title">All currencies</p>

                                            <div className="currency-grid scrollable">
                                                {[
                                                    "UAE Dirham د.إ", "Australian Dollar A$", "Bulgarian Lev лв",
                                                    "Canadian Dollar C$", "Swiss Franc CHF", "Chilean Peso CL$",
                                                    "Chinese Yuan RMB¥", "Colombian Peso COL$", "Czech Koruna Kč",
                                                    "Danish Krone DKK", "Egyptian Pound £E", "Euro €",
                                                    "Hong Kong Dollar HK$", "Hungarian Forint Ft", "British Pound £",
                                                    "Indonesian Rupiah Rp", "Israeli New Shekel ₪", "Indian Rupee ₹ ✓",
                                                    "Japanese Yen ¥", "South Korean Won ₩", "Moroccan Dirham د.م."
                                                ].map((currency, i) => (
                                                    <div key={i} className="currency-item">{currency}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* <div className="profile-option line">
                                <div className="option-left">
                                    <Image height={50} width={50} className="image1" src="/icons/internet.png" alt="" />
                                    <span>Language</span>
                                </div>
                                <div className="option-right">
                                    English
                                    <Image height={50} width={50} className="image2" src="/icons/next.png" alt="" />
                                </div>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
