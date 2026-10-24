// src/components/Sidebar.tsx
import { Car, Users, UserCog, LayoutGrid, Calendar, User } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  userName: string;
  userAvatarUrl?: string;
}

const navItems = [
  { label: "Cars", icon: LayoutGrid, path: "/cars" },
  { label: "Bookings", icon: Calendar, path: "/bookings" },
  { label: "Clients", icon: Users, path: "/clients" },
  { label: "Users", icon: UserCog, path: "/users" },
];

function Sidebar({ userName, userAvatarUrl }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-[#0d1424] flex flex-col justify-between fixed left-0 top-0 border-r border-white/5">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-xl bg-[#3b6ef5] flex items-center justify-center flex-shrink-0">
            <Car size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-semibold text-base leading-tight">
              Wheelio
            </p>
            <p className="text-[#7d8598] text-xs">Fleet Management</p>
          </div>
        </div>

        {/* Section label */}
        <p className="px-6 pt-4 pb-2 text-[11px] font-semibold tracking-wider text-[#5f6779] uppercase">
          Agency menu
        </p>

        {/* Nav menu */}
        <nav className="px-3 flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#3b6ef5] text-white"
                    : "text-[#8b93a7] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#3b6ef5] text-white"
                  : "text-[#8b93a7] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <User size={18} />
            Profile / Settings
          </NavLink>
        </nav>
      </div>

      {/* Bottom status card — links to /profile */}
      <NavLink
        to="/profile"
        className="mx-3 mb-5 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
      >
        {userAvatarUrl ? (
          <img
            src={userAvatarUrl}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#3b6ef5]/20 flex items-center justify-center">
              <User size={16} className="text-[#5b8bf5]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2ecc71] border-2 border-[#0d1424]" />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-white truncate">
            {userName}
          </span>
          <span className="text-xs text-[#7d8598]">Active session</span>
        </div>
      </NavLink>
    </aside>
  );
}

export default Sidebar;