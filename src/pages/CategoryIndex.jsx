import React from "react";
import categoriesData from "../data/categories.json";
import FolderCard from "../components/FolderCard";
import CardStack from "../components/CardStack";

export default function CategoryIndex() {
  return (
    <div className="max-w-360 mx-auto px-6 md:px-12 pt-8 pb-10">
      <header className="mb-16">
        <h1 className="text-[44px] md:text-[56px] font-bold font-quote tracking-[-0.02em] text-[#0A0A0A]">
          The collection.
        </h1>
      </header>

      {/* Desktop: card stack */}
      <main className="hidden lg:block">
        <CardStack categories={categoriesData} />
      </main>

      {/* Mobile: folder grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
        {categoriesData.map((category) => (
          <FolderCard key={category.slug} category={category} />
        ))}
      </main>
    </div>
  );
}
