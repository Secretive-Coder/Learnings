import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, Zap } from "lucide-react";
import { Button } from "../ui/button";

type User = {
  email: string;
  name: string;
  avatar: string;
};

type LayoutProps = {
  user: User | null;
  onLogout: () => void;
};

const Navbar = ({ user, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const menuref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 font-sans border-b border-gray-200 shadow-sm bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 mx-auto md:px-6 max-w-7xl">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate({ to: "/" })}
        >
          {/* Logo */}
          <div className="relative flex items-center justify-center w-10 h-10 transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 group-hover:shadow-purple-300/50 group-hover:scale-105">
            <Zap className="w-6 h-6 text-white" />
            <div className="absolute w-3 h-3 bg-white rounded-full shadow-md -bottom-1 -middle-1 animate-ping" />
          </div>

          {/* Brand Name */}
          <span className="text-2xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text">
            Taskflow
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Button
            className="p-2 text-gray-600 transition-colors duration-300 rounded-full hover:text-purple-500 hover:bg-purple-50"
            onClick={() => navigate({ to: "/profile" })}
            variant="ghost"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Dropdown */}
          <div ref={menuref} className="relative">
            <Button
              variant={"ghost"}
              onClick={handleMenuToggle}
              className="flex items-center gap-2 px-3 py-2 transition-colors duration-300 border border-transparent rounded-full cursor-pointer hover:bg-purple-50 hover:border-purple-200"
            >
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-full shadow-sm h-9 w-9"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 font-semibold text-white rounded-full shadow-md bg-gradient-to-br from-fuchsia-500 via-purple-600">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}

                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "User Name"}
                </p>
                <p className="text-xs font-normal text-gray-500">
                  {user?.email || "User Email"}
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? `rotate-180` : ""}`}
              />
            </Button>

            {menuOpen && (
              <ul className="absolute right-0 z-50 w-56 overflow-hidden bg-white border border-purple-100 shadow-xl top-14 rounded-2xl animate-fadeIn">
                <li className="p-2">
                  <Button
                    variant={"ghost"}
                    onClick={() => navigate({ to: "/profile" })}
                    className="flex items-center w-full gap-2 px-4 py-2.5 text-left hover:bg-purple-50 text-sm text-gray-700 transition-colors group"
                    role="menuitem"
                  >
                    <Settings className="w-5 h-5 text-gray-700" />
                    Profile Settings
                  </Button>
                </li>
                <li className="p-2">
                  <Button
                    variant={"ghost"}
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left text-red-600 rounded-lg hover:bg-red-50"
                    role="menuitem"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
