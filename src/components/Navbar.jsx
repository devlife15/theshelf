import React from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full bg-[#FAFAFA] pt-8 pb-5 flex justify-between items-baseline border-b border-gray-100">
      <Link
        to="/"
        className="text-[17px] font-bold font-quote uppercase tracking-[0.15em] text-[#0A0A0A]"
      >
        The Shelf.
      </Link>
      <div className="flex gap-8">
        <Link
          to="/categories"
          className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
            location.pathname.startsWith("/categories") ||
            location.pathname.startsWith("/collection")
              ? "text-[#0A0A0A]"
              : "text-[#6B6B6B] hover:text-[#0A0A0A]"
          }`}
        >
          Categories
        </Link>
        <Link
          to="/about"
          className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
            location.pathname === "/about"
              ? "text-[#0A0A0A]"
              : "text-[#6B6B6B] hover:text-[#0A0A0A]"
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
