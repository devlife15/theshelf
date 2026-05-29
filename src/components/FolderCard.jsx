import React from "react";
import { useNavigate } from "react-router";

export default function FolderCard({ category }) {
  const navigate = useNavigate();
  const clipPathId = `folder-clip-${category.slug}`;

  return (
    <>
      {/* Refined Fluid SVG Mask Layer */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            {/* 
        M 0,1                         -> Start at bottom-left
        L 0,0.12                      -> Left outer wall
        C 0,0.098 0.022,0.08 0.05,0.08 -> CORNER 1: Rounded outer left shoulder
        L 0.16,0.08                   -> Floor of the groove
        
        C 0.19,0.08 0.21,0.06 0.23,0.04 -> CORNER 2: Rolls off the floor into a 45° slant
        C 0.25,0.02 0.27,0    0.30,0    -> CORNER 3: Rolls out of the slant into the flat top tab
        
        L 1,0                         -> Across the top edge
        L 1,1                         -> Down the right edge
        Z                             -> Close path
      */}
            <path
              d="M 0,1 
               L 0,0.12 
               C 0,0.098 0.022,0.08 0.05,0.08 
               L 0.16,0.08 
               C 0.19,0.08 0.21,0.06 0.23,0.04 
               C 0.25,0.02 0.27,0    0.30,0 
               L 1,0 
               L 1,1 
               Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Outer Card Shell */}
      <div
        onClick={() => navigate(`/collection/${category.slug}`)}
        className="relative w-full aspect-[4/5] bg-[#0A0A0A] rounded-[24px] p-2 group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015]"
      >
        {/* Inner Card Frame */}
        <div className="relative w-full h-full overflow-hidden rounded-[16px] bg-[#141414]">
          {/* Permanent Image Layer masked by the refined folder shape */}
          <div
            style={{ clipPath: `url(#${clipPathId})` }}
            className="absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <img
              src={category.editorialImage}
              alt={category.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] brightness-[0.88] group-hover:brightness-[0.93]"
              loading="lazy"
            />
            {/* Soft ambient vignette overlay for content readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5 mix-blend-multiply" />
          </div>

          {/* Minimal Typography Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-5 flex justify-between items-baseline z-10">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-sm">
              {category.label}
            </h3>
            <span className="text-[11px] text-neutral-400 font-mono tracking-wider">
              {category.itemCount} Units
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
