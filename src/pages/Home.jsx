import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import ProductCard from "../components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-360 mx-auto px-6 md:px-12 pb-10">
      <header className="max-w-4xl mt-20 mb-20 opacity-0 animate-hero-fade">
        <h1 className="text-[56px] md:text-[76px] font-bold font-quote tracking-[-0.03em] text-[#0A0A0A] leading-[0.65] mb-10">
          Things worth <br />
          owning.
        </h1>
        <p className="text-[15px] md:text-[17px] text-[#6B6B6B] font-normal leading-tight max-w-xl">
          A personal archive of furniture and workspace objects. <br /> Updated
          when something earns it.
        </p>
      </header>

      {/* Filter bar */}
      <div className="w-full overflow-x-auto no-scrollbar flex gap-2.5 mb-12 pb-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-5 py-2 rounded-full text-[11px] font-medium uppercase tracking-widest transition-all duration-200 border ${
            activeCategory === "All"
              ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
              : "bg-transparent border-neutral-200 text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
          }`}
        >
          All
        </button>
        {categoriesData.map((cat) => (
          <button
            key={cat.slug}
            onClick={() =>
              setActiveCategory(activeCategory === cat.slug ? "All" : cat.slug)
            }
            className={`px-5 py-2 rounded-full text-[11px] font-medium uppercase tracking-widest transition-all duration-200 border ${
              activeCategory === cat.slug
                ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
                : "bg-transparent border-neutral-200 text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={activeCategory}
          className="columns-1 md:columns-2 lg:columns-3 gap-x-15"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="break-inside-avoid mb-16"
              variants={cardVariants}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
