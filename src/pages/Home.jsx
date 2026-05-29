import React, { useState } from "react";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl px-6 mx-auto pb-10">
      {/* {was w-full above} */}
      {/* Editorial High-Character Heading Block */}
      <header className="max-w-4xl mt-12 mb-20 opacity-0 animate-hero-fade">
        <h1 className="text-[56px] md:text-[76px] font-bold font-quote tracking-[-0.03em] text-[#0A0A0A] leading-[1.05] mb-6">
          Things worth owning.
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#6B6B6B] font-normal leading-tight max-w-xl">
          A personal archive of furniture and workspace objects. <br /> Updated
          when something earns it.
        </p>
      </header>

      {/* Minimalist Pill Filter Bar */}
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

      {/* Editorial Responsive Layout Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}
