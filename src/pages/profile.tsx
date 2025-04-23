import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { useToast } from "@/components/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const router = useRouter();
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const { user, setUser, logout } = useAuth();
  interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  authProvider: "credentials" | "google";
  isValidated: boolean;
}


  // const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<{ user: User }>("/api/auth/me");
        setUser(res.data.user);
        const [fName, lName] = res.data.user.name.split(" ");
        setFirstName(fName || "");
        setLastName(lName || "");
        setPhone(res.data.user.phone || "");
      } catch (err) {
        console.error("Failed to fetch user:", err);
        router.push("/");
      }
    };
    fetchUser();
  }, [router, setUser]);
  

  const handleSaveProfile = async () => {
    try {
      showToast({
        message: "Updating profile...",
        type: "loading",
        isLoading: true,
      });

      await axios.post("/api/profile/update", {
        name: `${firstName} ${lastName}`,
        phone,
      });

      showToast({
        message: "Profile updated successfully",
        type: "success",
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      showToast({
        message: "Failed to update profile.",
        type: "error",
        isLoading: false,
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return showToast({
        message: "New passwords do not match.",
        type: "error",
        isLoading: false,
      });
    }

    try {
      showToast({
        message: "Changing password...",
        type: "loading",
        isLoading: true,
      });

      await axios.post("/api/profile/change-password", {
        newPassword,
        confirmPassword,
      });      

      showToast({
        message: "Password changed successfully",
        type: "success",
        isLoading: false,
      });

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      showToast({
        message: "Failed to change password.",
        type: "error",
        isLoading: false,
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "delete") {
      return showToast({
        message: 'Type "delete" to confirm.',
        type: "error",
        isLoading: false,
      });
    }

    try {
      showToast({
        message: "Deleting account...",
        type: "loading",
        isLoading: true,
      });

      await axios.delete("/api/profile/delete-account", {
        data: { confirmEmail: user?.email },
      } as AxiosRequestConfig);
      setUser(null)
      showToast({
        message: "Account deleted successfully",
        type: "success",
        isLoading: false,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      showToast({
        message: "Failed to delete account.",
        type: "error",
        isLoading: false,
      });
    }
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
    <div className="profile-container">
      <div className="profile-page">
        <aside className="sidebar">
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
          <button
            className={`tab-button ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab-button ${activeTab === "delete" ? "active" : ""}`}
            onClick={() => setActiveTab("delete")}
          >
            Delete Account
          </button>
        </aside>

        <main className="content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Profile Details</h2>
              <div className="input-section">
                <div className="input-group">
                  <label>First Name</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span className="edit-icon">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/edit.png"
                        alt="edit icon"
                      />
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Last Name</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <span className="edit-icon">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/edit.png"
                        alt="edit icon"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <h3>Account Details</h3>
              <div className="input-section">
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ""} disabled />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <div className="input-with-icon">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="edit-icon">
                      <Image
                        height={50}
                        width={50}
                        className="image1"
                        src="/icons/edit.png"
                        alt="edit icon"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleSaveProfile} className="button">
                  Save
                </button>
                <hr />
                <button onClick={handleLogout} className="button btn-logout">
                  Logout
                </button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="password-section">
              <h2>Change Password</h2>
              {/* <div className="input-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div> */}
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button onClick={handleChangePassword} className="button">
                Save
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="notifications-section">
              <h2>Notifications</h2>
              <p>No new notifications</p>
            </div>
          )}

          {activeTab === "delete" && (
            <div className="delete-section">
              <h2>Delete Account</h2>
              <div className="delete-input">
                <p>Type &quot;delete&quot; below to confirm account deletion.</p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                />
                <button
                  onClick={handleDeleteAccount}
                  className="delete-btn button"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
