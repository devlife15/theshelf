import React from "react";

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-12 mt-auto flex justify-between items-center border-t border-gray-100 text-[11px] uppercase tracking-[0.2em] text-[#9B9B9B]">
      <div>The Shelf</div>
      <div>Curated by Ayan — {new Date().getFullYear()}</div>
    </footer>
  );
}
