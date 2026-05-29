import React, { useRef, useState } from "react";
import { Link } from "react-router";

const getImage = (product) =>
  Array.isArray(product.images) ? product.images[0] : product.image;

const aspectMap = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-[1/1]",
};

export default function ProductCard({ product }) {
  const aspect = aspectMap[product.orientation] || "aspect-[4/3]";
  const containerRef = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`translate(${x * 10}px, ${y * 10}px) scale(1.04)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px) scale(1)");
  };

  return (
    <Link to={`/item/${product.id}`} className="group block cursor-pointer">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full ${aspect} bg-gray-100 overflow-hidden mb-4`}
      >
        <img
          src={getImage(product)}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{
            transform,
            transition: transform === "" ? "none" : "transform 120ms ease-out",
            willChange: "transform",
          }}
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
