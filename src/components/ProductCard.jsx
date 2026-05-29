import React from "react";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <Link to={`/item/${product.id}`} className="group block cursor-pointer">
      {/* Container implements Layout & Card Styling from Website_.jfif */}
      <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between items-baseline font-normal">
        <div>
          <h4 className="text-[15px] font-medium text-[#0A0A0A] leading-snug">
            {product.name}
          </h4>
          <p className="text-[13px] text-[#6B6B6B] mt-0.5">{product.brand}</p>
        </div>
        <span className="text-[14px] text-[#0A0A0A] font-mono">
          {product.currency === "USD" ? "$" : ""}
          {product.price}
        </span>
      </div>
    </Link>
  );
}
