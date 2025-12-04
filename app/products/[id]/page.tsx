"use client";

import Modal from "@/components/modals/confirmationModal";
import ToastMessage from "@/components/ToastMessage";
import { useFavorites } from "@/context/favContext";
import { useUser } from "@/context/userContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductDetails() {
  const id = useParams().id;
  console.log(id);
  const [product, setProduct] = useState<Product>();
  const { user, login, logout } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setCurrentIndex(0);
    };
    fetchData();
  }, [id]);

  if (!product) return null; // Handle loading state

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 max-w-[1200px] mx-auto p-6 mt-[70px]">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-full h-[300px] overflow-hidden rounded-xl flex items-center justify-center">
            <img
              src={product.images[currentIndex]}
              alt={product.title}
              className="w-auto h-full sm:h-[300px] md:h-[400px] object-cover rounded-xl"
            />

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className="absolute cursor-pointer top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              &#10094;
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              &#10095;
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {product.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                className="w-20 h-20 object-cover rounded-md cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 px-4 mt-[30px]">
          <h3 className="text-3xl font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-lg">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <p>
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <button
            className={`w-[200px] cursor-pointer px-[25px] py-[15px] rounded font-semibold text-white
            ${
              isFavorite(product.id)
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
    }
  `}
            onClick={openModal}
          >
            {isFavorite(product.id)
              ? "Remove from favourites"
              : "Add to favourites"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          productId={product.id}
        />
      )}
    </>
  );
}

export default ProductDetails;
