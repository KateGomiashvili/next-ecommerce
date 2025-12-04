import { useFavorites } from "@/context/favContext";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}

export default function Modal({ isOpen, onClose, productId }: ModalProps) {
  if (!isOpen) return null;
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-xl shadow-lg z-50 p-6 flex flex-col items-center gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        
        <h1 className="text-center text-lg font-semibold text-gray-800">
          {isFavorite(productId)
            ? "Would you like to remove this product from your favorites?"
            : "Would you like to add this product to your favorites?"}
        </h1>

        
        <div className="flex w-full justify-between gap-4 mt-4">
          <button
            className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            onClick={() => {
              toggleFavorite(productId);
              const isFav = isFavorite(productId);

              toggleFavorite(productId);
              onClose();
            }}
          >
            OK
          </button>

          <button
            className="flex-1 bg-red-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
