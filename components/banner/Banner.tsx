"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BannerSlider() {
  const slides = [
    {
      img: "/images/360_F_347750203_GXv0FzGtXjEhAyyv68TaNzBpboULLSYR.jpg",
      text: "Glow Up Your Style – Explore Our Makeup Collection.",
      link: "/products?category=beauty",
    },
    {
      img: "/images/360_F_508170187_4Oonk4IG8u9eyfwSUvTASkT8hl71vRX2.jpg",
      text: "Home Sweet Home – Furniture That Fits Your Life.",
      link: "/products?category=furniture",
    },
    {
      img: "/images/360_F_292087658_DcjJQHybeo1WYSnnw8dYd0BQnUbvpcDt.jpg",
      text: "A Whiff of Luxury – Fragrances That Captivate.",
      link: "/products?category=fragrances",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((index + 1) % slides.length);
  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);

  return (
    <>
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden mx-auto mt-[75px]">
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.img}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold w-[80%] md:w-[50%] text-white drop-shadow-lg px-4">
              <p className="text-2xl md:text-4xl mb-4">{slide.text}</p>
              <a
                href={slide.link}
                className="bg-white text-gray-800 font-semibold rounded-lg px-6 py-3 inline-block hover:bg-gray-100 transition"
              >
                Learn more
              </a>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 text-white font-bold text-2xl p-2 md:p-4 rounded-r hover:bg-black/70 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 text-white font-bold text-2xl p-2 md:p-4 rounded-l hover:bg-black/70 transition"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`dot h-[15px] w-[15px] rounded-full inline-block cursor-pointer transition ${
              index === i ? "bg-gray-700" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </>
  );
}
