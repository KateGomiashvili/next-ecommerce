"use client";


import { useFavorites } from "@/context/favContext";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favProducts, setFavProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);
      try {
        const products = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            return res.json();
          })
        );
        setFavProducts(products);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
      setLoading(false);
    }

    if (favorites.length > 0) {
      loadFavorites();
    } else {
      setFavProducts([]);
      setLoading(false);
    }
  }, [favorites]);

  if (loading) return <p className="text-center mt-10">Loading favorites...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-[90px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Favorite Products 
      </h1>

      {favProducts.length === 0 ? (
        <p className="text-gray-500 text-lg">No favorite products yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {favProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white w-[250px] rounded-2xl shadow-md hover:shadow-lg transition p-4 text-center relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-40 h-40 object-cover rounded-lg mb-3 mx-auto"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <p className="text-blue-600 font-bold text-lg mb-3">
                ${product.price}
              </p>

              
              <button
                onClick={() => toggleFavorite(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Remove
              </button>

              {product.meta?.createdAt && (
                <div className="absolute top-[10px] right-[10px] text-sm text-gray-400">
                  {product.meta.createdAt.slice(0, 4)}
                </div>
              )}

              <div className="absolute top-[10px] left-[10px]">
                ★ {product.rating}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
