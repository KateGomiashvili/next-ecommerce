"use client";

import { getProductsPaginated, searchProducts } from "@/util/api";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useFavorites } from "@/context/favContext";
import ToastMessage from "../ToastMessage";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [search, setSearch] = useState(initialSearch);
  const [inputValue, setInputValue] = useState(initialSearch);
  
  useEffect(() => {
    const load = async () => {
      if (search) {
        const data = await searchProducts(search);
        setProducts(data.products);
      } else {
        const data = await getProductsPaginated(page, 20);
        setProducts(data.products);
      }
    };

    load();
  }, [page, search]);

  function handleSearch() {
    setSearch(inputValue); 
    setPage(1);
    router.push(`?search=${inputValue}`);
  }

  function handleClear() {
    setInputValue(""); 
    setSearch("");
    setPage(1);
    router.push(`?search=`);
  }
   function handleToggle(productId: number) {
  const isFav = isFavorite(productId);

  toggleFavorite(productId);

  if (isFav) {
    setToast({ message: "Removed from favourites", type: "error" });
  } else {
    setToast({ message: "Added to favourites", type: "success" });
  }

  setTimeout(() => setToast(null), 2000);
}
  return (
    <div id="product-top" className="max-w-[1200px] mx-auto px-4 mt-[80px]">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full md:w-[300px] px-4 py-2 border rounded-lg"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Search
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      <Pagination page={page} setPage={setPage} />

      <div className="flex flex-wrap gap-[calc((100%-1000px)/3)]">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center justify-between text-center relative bg-white w-[250px] p-4 rounded-2xl shadow mb-[20px]">
             <img
              src={product.thumbnail}
              alt={product.title}
              className="w-40 h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-[10px] mb-[15px]">({product.meta.createdAt.slice(0, 4)})</p>

            <p className="text-blue-600 font-bold text-lg mb-3">
              ${product.price}
            </p>
            
            <a
              href={`/products/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </a>

            <div className="absolute top-[10px] right-[10px]">★{product.rating}</div>
            <div className="absolute top-[10px] left-[10px] cursor-pointer" onClick={() => handleToggle(product.id)}>
              <span className="material-symbols-outlined" style={{ color: isFavorite(product.id) ? "red" : "gray" }}>favorite</span>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

    </div>
    
  );
}
