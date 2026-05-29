import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { goToAffiliate } from "../utils/affiliate";

const cinematicEase = [0.16, 1, 0.3, 1];
const cubicTransition = { ease: cinematicEase, duration: 0.45 };

// Carousel horizontal slide animations
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = productsData.find((p) => p.id === slug);

  if (!product) {
    return (
      <div className="w-full py-24 text-center">
        <p className="text-[15px] text-[#6B6B6B]">
          Product entry missing from system file index.
        </p>
        <Link to="/" className="text-[13px] underline mt-4 block">
          Return home
        </Link>
      </div>
    );
  }

  // Normalize image data to support both arrays or legacy single strings safely
  const imgs = product.images || [product.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex >= imgs.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = imgs.length - 1;

    setCurrentIndex(nextIndex);
    setPage([page + newDirection, newDirection]);
  };

  // Process swipe gesture thresholds
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      paginate(1); // Swipe left -> Next Image
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1); // Swipe right -> Previous Image
    }
  };

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-360 mx-auto px-6 md:px-12 pt-4 pb-10">
      {/* Split Structural Layout Container */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-32">
        {/* LEFT COLUMN: SWIPABLE CINEMATIC CAROUSEL (60% Width) */}
        <div className="w-full lg:w-[60%] relative aspect-[4/3] bg-[#F4F4F4] overflow-hidden select-none group">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.img
              key={page}
              src={imgs[currentIndex]}
              alt={`${product.name} aspect view`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: cinematicEase, duration: 0.6 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing absolute inset-0"
            />
          </AnimatePresence>

          {/* Minimalist Fractional Metadata Indicator (e.g., 01 / 03) */}
          {imgs.length > 1 && (
            <div className="absolute bottom-6 right-6 z-10 bg-black/10 backdrop-blur-md text-white px-3 py-1.5 rounded-sm font-mono text-[11px] tracking-widest pointer-events-none select-none">
              {(currentIndex + 1).toString().padStart(2, "0")} /{" "}
              {imgs.length.toString().padStart(2, "0")}
            </div>
          )}

          {/* Discreet Left/Right Click Zones (Visible only on desktop hover) */}
          {imgs.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-black/40 hover:text-black text-xl font-light cursor-pointer"
              >
                ‹
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-black/40 hover:text-black text-xl font-light cursor-pointer"
              >
                ›
              </button>
            </>
          )}

          {/* Structural Progress Baseline Indicator Tracker */}
          {imgs.length > 1 && (
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-neutral-200/50 flex">
              {imgs.map((_, i) => (
                <div
                  key={i}
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${100 / imgs.length}%`,
                    backgroundColor:
                      i === currentIndex ? "#0A0A0A" : "transparent",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: EDITORIAL METRIC CONTENT PANEL (40% Width) */}
        <div className="w-full lg:w-[40%] sticky top-8">
          <div className="border-b border-neutral-100 pb-6 mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6B6B6B]">
              {product.brand}
            </span>
            <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#0A0A0A] mt-1 mb-3">
              {product.name}
            </h1>
            <span className="text-[18px] font-mono text-[#0A0A0A]">
              {product.currency === "USD" ? "$" : ""}
              {product.price}
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#0A0A0A] mb-3">
              Curator Note
            </h3>
            <p className="text-[15px] text-[#6B6B6B] leading-tight italic">
              "{product.note}"
            </p>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] text-[#6B6B6B] uppercase tracking-wider font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Framer Motion Interactive Action Button */}
          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => goToAffiliate(product.affiliateUrl)}
            className="relative w-full border border-[#0A0A0A] text-[#0A0A0A] text-[12px] font-semibold uppercase tracking-[0.2em] py-4 overflow-hidden cursor-pointer bg-transparent select-none"
          >
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={cubicTransition}
              className="absolute inset-0 bg-[#0A0A0A] z-0"
            />

            <motion.span
              variants={{
                initial: { color: "#0A0A0A" },
                hover: { color: "#FAFAFA" },
              }}
              transition={cubicTransition}
              className="relative z-10 flex items-center justify-center gap-1.5"
            >
              View Product
              <motion.span
                variants={{
                  initial: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={cubicTransition}
              >
                →
              </motion.span>
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Related Products Module */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-100 pt-16">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A] mb-10">
            More in {product.category}.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
