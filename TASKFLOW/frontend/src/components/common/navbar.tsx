import { useNavigate } from "@tanstack/react-router";
import React from "react";
import {Zap} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

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
            
        </div>
      </div>
    </header>
  );
};

export default Navbar;
