// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Shield,
  Briefcase,
  Sliders,
  Lock,
  History,
} from "lucide-react";
import type { User } from "../types/User";
import apiClient from "../api/client.api";
import { getErrorMessage } from "../api/getErrorMessage";
import { useLocation, useParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

function userDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const isNewUser = location.pathname === "/add-user";
  const { showToast } = useToast();

  useEffect(() => {
    const userUrl =
      location.pathname === "/profile" ? "/user/me" : id ? `/user/${id}` : "";

    if (!userUrl || userUrl === "") return;
    apiClient
      .get(userUrl)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        showToast(
          "error",
          getErrorMessage(error, "Failed to load user details."),
        );
      });
  }, [id, location.pathname, showToast]);

  const handleSave = () => {
    if (!isNewUser && !user) return;

    if (isNewUser) {
      apiClient
        .post(`/user`, user)
        .then((response) => {
          setUser(response.data);
          setIsEditing(false);
          showToast("success", "User added successfully!");
        })
        .catch((error) => {
          console.error("Failed to add new user:", error);
          showToast(
            "error",
            getErrorMessage(error, "Failed to add new user!"),
          );
        });
    } else {
      apiClient
        .patch(`/user`, user)
        .then((response) => {
          setUser(response.data);
          showToast("success", "User data updated successfully!");
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Failed to update user data:", error);
          showToast(
            "error",
            getErrorMessage(error, "Failed to update user data."),
          );
        });
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1326] p-8">
      {/* Breadcrumb + title + actions */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs tracking-wider text-[#5f6779] mb-2">
            ADMIN CONSOLE /{" "}
            <span className="text-[#8b93a7] font-medium">
              {id
                ? "USER DETAILS"
                : isNewUser
                  ? "ADD USER"
                  : "ACCOUNT SETTINGS"}
            </span>
          </p>
          <h1 className="text-3xl font-bold text-white mb-1">
            {id
              ? "User Details"
              : isNewUser
                ? "Add User"
                : "Account & Security"}
          </h1>
          <p className="text-sm text-[#8b93a7]">
            Manage credentials, permissions, and contact details.
          </p>
        </div>

        {(isEditing || isNewUser) && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-[#c3c8d4] hover:bg-white/15 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors"
            >
              ✓ {isNewUser ? "Add User" : "Save Changes"}
            </button>
          </div>
        )}

        {!isEditing && !isNewUser && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-[#c3c8d4] hover:bg-white/15 transition-colors"
          >
            Edit profile
          </button>
        )}
      </div>

      {/* Identity summary card */}
      <div className="bg-[#0d1424] border border-white/10 rounded-2xl p-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.firstname} ${user.lastname}`}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#3b6ef5]/20 flex items-center justify-center text-[#7ba3ff] text-xl font-semibold">
                {user?.firstname?.charAt(0).toUpperCase()}
                {user?.lastname?.charAt(0).toUpperCase()}
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#151c30] border border-white/10 text-[#c3c8d4] flex items-center justify-center hover:bg-[#1c2438] transition-colors">
              <Camera size={11} />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-white">
                {user?.firstname} {user?.lastname}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#dcfce7] text-[#166534]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                Active
              </span>
            </div>
            <p className="text-sm text-[#8b93a7] flex items-center gap-1.5">
              <Mail size={13} /> {user?.email}
            </p>
          </div>
        </div>

        {user?.role && (
          <div className="px-5 py-3 rounded-xl bg-[#151c30] border border-white/10">
            <p className="text-[11px] tracking-wider text-[#5f6779] mb-1">
              ACCESS ROLE
            </p>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Shield size={13} className="text-[#3b6ef5]" />
              {user.role}
            </p>
          </div>
        )}
      </div>

      {/* Tabs (Personal Information is the only wired section) */}
      <div className="flex items-center gap-2 mb-6">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#3b6ef5] text-white border border-[#3b6ef5]">
          <Briefcase size={15} /> Personal Information
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#5f6779] cursor-not-allowed">
          <Sliders size={15} /> Preferences
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#5f6779] cursor-not-allowed">
          <Lock size={15} /> Security & 2FA
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#5f6779] cursor-not-allowed">
          <History size={15} /> Access Log
        </button>
      </div>

      {/* Details form */}
      <div className="bg-[#0d1424] border border-white/10 rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-white mb-1">
          General Profile
        </h3>
        <p className="text-sm text-[#8b93a7] mb-6">
          Basic identity information for this account.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[11px] tracking-wider text-[#5f6779] mb-2">
              FIRST NAME
            </label>
            {isEditing || isNewUser ? (
              <input
                type="text"
                value={user?.firstname ?? ""}
                onChange={(e) =>
                  setUser((currentUser) =>
                    currentUser
                      ? { ...currentUser, firstname: e.target.value }
                      : currentUser,
                  )
                }
                className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b6ef5]"
              />
            ) : (
              <p className="px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white">
                {user?.firstname}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] tracking-wider text-[#5f6779] mb-2">
              LAST NAME
            </label>
            {isEditing || isNewUser ? (
              <input
                type="text"
                value={user?.lastname ?? ""}
                onChange={(e) =>
                  setUser((currentUser) =>
                    currentUser
                      ? { ...currentUser, lastname: e.target.value }
                      : currentUser,
                  )
                }
                className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b6ef5]"
              />
            ) : (
              <p className="px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white">
                {user?.lastname}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] tracking-wider text-[#5f6779] mb-2">
              <Mail size={12} /> EMAIL
            </label>
            {isEditing || isNewUser ? (
              <input
                type="email"
                value={user?.email ?? ""}
                onChange={(e) =>
                  setUser((currentUser) =>
                    currentUser
                      ? { ...currentUser, email: e.target.value }
                      : currentUser,
                  )
                }
                className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b6ef5]"
              />
            ) : (
              <p className="px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white">
                {user?.email}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] tracking-wider text-[#5f6779] mb-2">
              <Phone size={12} /> PHONE NUMBER
            </label>
            {isEditing || isNewUser ? (
              <input
                type="tel"
                value={user?.phoneNumber ?? ""}
                onChange={(e) =>
                  setUser((currentUser) =>
                    currentUser
                      ? { ...currentUser, phoneNumber: e.target.value }
                      : currentUser,
                  )
                }
                className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b6ef5]"
              />
            ) : (
              <p className="px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white">
                {user?.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {(isEditing || isNewUser) && (
          <div className="flex justify-end gap-3 pt-2 border-t border-white/10 mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-[#c3c8d4] hover:bg-white/15 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors"
            >
              {isNewUser ? "Add User" : "Save changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default userDetails;
