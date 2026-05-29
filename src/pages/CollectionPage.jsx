import React from "react";
import { useParams, Link } from "react-router";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import ProductCard from "../components/ProductCard";

export default function CollectionPage() {
  const { category } = useParams();

  const currentCategory = categoriesData.find((c) => c.slug === category);
  const filteredProducts = productsData.filter((p) => p.category === category);

  return (
    <div className="w-full pt-4">
      <div className="mb-12">
        <Link
          to="/categories"
          className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>

      <header className="mb-16">
        <h1 className="text-[44px] md:text-[56px] font-bold tracking-[-0.02em] text-[#0A0A0A] capitalize">
          {currentCategory ? currentCategory.label : category}.
        </h1>
        {currentCategory && (
          <p className="text-[15px] text-[#6B6B6B] mt-2 max-w-md">
            {currentCategory.description}
          </p>
        )}
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}
