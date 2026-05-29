import React from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full px-6 md:px-30 bg-[#FAFAFA] pt-5 pb-5 flex justify-between items-center border-b border-gray-100">
      <Link to="/" className="text-[17px] font-bold text-[#0A0A0A]">
        The Shelf.
      </Link>
      <div className="flex gap-8">
        <Link
          to="/categories"
          className={`text-[12px] font-bold transition-colors ${
            location.pathname.startsWith("/categories") ||
            location.pathname.startsWith("/collection")
              ? "text-[#0A0A0A]"
              : "text-[#6B6B6B] hover:text-[#0A0A0A]"
          }`}
        >
          categories
        </Link>
        <Link
          to="/about"
          className={`text-[12px] font-bold transition-colors ${
            location.pathname === "/about"
              ? "text-[#0A0A0A]"
              : "text-[#6B6B6B] hover:text-[#0A0A0A]"
          }`}
        >
          about
        </Link>
      </div>
    </nav>
  );
}
