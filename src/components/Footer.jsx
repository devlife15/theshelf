import React from "react";

export default function Footer() {
  return (
    <footer className="w-full pt-5 pb-5 mt-auto flex justify-center border-t border-gray-100 text-[12px] text-[#9B9B9B]">
      <span>
        curated by <span className="font-quote">Ayan</span> —{" "}
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}
