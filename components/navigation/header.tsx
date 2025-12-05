"use client";

import { UserProvider, useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
interface Category {
  slug: string;
  name: string;
  url: string;
}
const Header = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, logout, loading } = useUser();
  
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("categories:", data);
        setCategories(data);
      });
  }, []);

 
  if (loading) return null;


  if (!user) return null;
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold text-blue-600">
          OnlineShop
        </a>
        <nav className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </a>
          <div
            id="products-menu"
            className="text-gray-700 hover:text-blue-600 transition relative group"
          >
            Products
            <div
              id="dropdown"
              className="absolute left-[-30px] p-[20px] mt-0 bg-white border rounded-lg shadow-md hidden z-10 w-[300px] group-hover:block"
            >
              <a href="/">
                <p className="font-semibold mb-2 cursor-pointer hover:text-blue-500">
                  All
                </p>
              </a>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {categories.map((cat) => (
                  <a key={cat.slug} href={`/?category=${cat.slug}`}>
                    <p className="cursor-pointer hover:text-blue-500">
                      {cat.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

         
        </nav>
        <div className="flex items-center space-x-4 relative">
          <button className="text-gray-700 hover:text-blue-600 transition">
            <a href={`/favourites`}><span className="material-symbols-outlined">favorite</span></a>
          </button>
          <p>{user?.username}</p>
          <p onClick={logout}>Log Out</p>
          <button
            id="menuBtn"
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            <span className="material-symbols-outlined"> menu_open </span>
          </button>
          <div
            id="mobileMenu"
            className="hidden md:hidden absolute top-full right-4 mt-2 w-[320px] bg-white shadow-md rounded-lg z-40"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="index.html"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </a>

              <div>
                <button
                  id="mobileProductsBtn"
                  className="w-full text-left text-gray-700 hover:text-blue-600 transition flex items-center justify-between"
                >
                  <span>Products</span>
                  <span className="material-symbols-outlined">
                    {" "}
                    expand_more{" "}
                  </span>
                </button>

                <div
                  id="mobile-dropdown"
                  className="hidden mt-3 bg-white border rounded-lg shadow-inner p-3"
                >
                  <a
                    href="products.html"
                    className="block font-semibold mb-2 hover:text-blue-500"
                  >
                    All
                  </a>
                  <div
                    id="mobile-grid"
                    className="grid grid-cols-2 gap-2"
                  ></div>
                </div>
              </div>

              <a
                href="about.html"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                About
              </a>
              <a
                href="contact.html"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
