"use client";

import { useEffect, useState } from "react";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   tags: string[];
//   brand: string;
//   thumbnail: string;
// }

export default function TopProducts() {
  const [topProducts, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json())
      .then((res) =>
        res.products
          .sort((a: Product, b: Product) => b.rating - a.rating)
          .slice(0, 3)
      )
      .then((data) => {
        console.log("top rated:", data);
        setProducts(data);
      });
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto px-4 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Top Rated Products
      </h2>

      <div id="top" className="flex flex-wrap justify-center gap-6">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white w-[350px] mb-[20px] rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center justify-between text-center relative"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-40 h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500 mb-2">{product.category}</p>

            <p className="text-blue-600 font-bold text-lg mb-3">
              ${product.price}
            </p>

            <a
              href={`/products/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </a>

            <div className="absolute top-[5px] right-[5px]">★{product.rating}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
