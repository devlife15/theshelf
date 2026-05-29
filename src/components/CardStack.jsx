import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

export default function CardStack({ categories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const navigate = useNavigate();

  const total = categories.length;

  const cycleForward = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const cycleBackward = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const jumpTo = useCallback(
    (index) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") cycleForward();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") cycleBackward();
      else if (e.key === "Enter")
        navigate(`/collection/${categories[activeIndex].slug}`);
      else {
        const num = parseInt(e.key);
        if (!isNaN(num) && num >= 1 && num <= total) jumpTo(num - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    cycleForward,
    cycleBackward,
    jumpTo,
    activeIndex,
    categories,
    navigate,
    total,
  ]);

  // Returns transform values for each card position relative to active
  const getStackStyle = (offset) => {
    const absOffset = Math.abs(offset);
    return {
      zIndex: total - absOffset,
      y: offset === 0 ? 0 : offset * 18 + (absOffset - 1) * 6,
      scale: 1 - absOffset * 0.04,
      opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.15,
      rotateX: offset === 0 ? 0 : offset * 2,
    };
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Keyboard hint */}
      <div className="self-end flex items-center gap-4 text-[11px] text-[#9B9B9B] uppercase tracking-[0.15em]">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 border border-[#D0D0D0] rounded text-[10px]">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 border border-[#D0D0D0] rounded text-[10px]">
            →
          </kbd>
          navigate
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 border border-[#D0D0D0] rounded text-[10px]">
            ↵
          </kbd>
          open
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 border border-[#D0D0D0] rounded text-[10px]">
            1–{total}
          </kbd>
          jump
        </span>
      </div>

      {/* Stack container */}
      <div
        className="relative w-full max-w-[520px] mx-auto"
        style={{ height: "600px", perspective: "1200px" }}
      >
        {categories.map((category, i) => {
          // Compute circular offset from active
          let offset = i - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const { zIndex, y, scale, opacity, rotateX } = getStackStyle(offset);
          const isActive = offset === 0;

          return (
            <motion.div
              key={category.slug}
              className="absolute inset-0 cursor-pointer"
              style={{ zIndex, transformOrigin: "center bottom" }}
              animate={{ y, scale, opacity, rotateX }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.9,
              }}
              onClick={() => {
                if (isActive) navigate(`/collection/${category.slug}`);
                else {
                  setDirection(offset > 0 ? 1 : -1);
                  setActiveIndex(i);
                }
              }}
            >
              {/* Card body */}
              <div
                className="w-full h-full bg-[#111] overflow-hidden"
                style={{ borderRadius: "16px" }}
              >
                {/* Editorial image, only visible on active */}
                <motion.img
                  src={category.editorialImage}
                  alt={category.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Dark overlay so text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent z-10" />

                {/* Footer meta */}
                <div className="absolute bottom-0 inset-x-0 p-7 flex justify-between items-end z-20">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] font-mono">
                      {String(
                        activeIndex === i ? activeIndex + 1 : "",
                      ).padStart(2, "0") || `0${i + 1}`}
                    </span>
                    <h3 className="text-[28px] font-bold text-white tracking-[-0.02em] leading-none">
                      {category.label}
                    </h3>
                    <motion.p
                      className="text-[13px] text-[#A0A0A0] mt-1 max-w-[260px]"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 6,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: isActive ? 0.15 : 0,
                      }}
                    >
                      {category.description}
                    </motion.p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-[#6B6B6B] uppercase tracking-[0.2em] font-mono">
                      {category.itemCount} units
                    </span>
                    <motion.span
                      className="text-[11px] text-white uppercase tracking-[0.15em] font-mono flex items-center gap-1"
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Enter to open →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? "w-6 h-1.5 bg-[#0A0A0A]"
                : "w-1.5 h-1.5 bg-[#D0D0D0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
