// src/components/Header.tsx
import { Search, LogOut } from "lucide-react";

interface HeaderProps {
  userName: string;
  userEmail: string;
  userRole: string;
  userAvatarUrl?: string;
  onSearch?: (query: string) => void;
  onLogout: () => void;
}

function Header({
  userName,
  userEmail,
  userRole,
  userAvatarUrl,
  onSearch,
  onLogout,
}: HeaderProps) {
  return (
    <header className="h-20 bg-[#0d1424] border-b border-white/5 flex items-center justify-between px-8 gap-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5f6779]"
        />
        <input
          type="text"
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder="Search a contract, vehicle, client..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#151c30] border border-white/5 rounded-lg text-sm text-white
                     placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
        />
      </div>

      {/* User + logout */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          {userAvatarUrl ? (
            <img
              src={userAvatarUrl}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#3b6ef5]/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#5b8bf5]">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {userName}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#3b6ef5]/15 text-[#7ba3ff]">
                {userRole}
              </span>
            </div>
            <span className="text-xs text-[#7d8598]">{userEmail}</span>
          </div>
        </div>

        <div className="w-px h-8 bg-white/10" />

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-[#8b93a7] hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;