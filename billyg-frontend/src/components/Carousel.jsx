import React, { useState, useEffect } from "react";

// images
import buff1 from "../assets/buff1.jpg";
import buff2 from "../assets/buff2.jpg";
import buff3 from "../assets/buff3.jpg";
import buff4 from "../assets/buff4.jpg";
import buff5 from "../assets/buff5.jpg";
import buff6 from "../assets/buff6.jpg";
import buff7 from "../assets/buff7.jpg";
import buff8 from "../assets/buff8.jpg";
import buff9 from "../assets/buff9.jpg";

const images = [buff1, buff2, buff3, buff4, buff5, buff6, buff7, buff8, buff9];

export default function AutoCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(1);

  // Detect screen size
  useEffect(() => {
    const updateImagesPerSlide = () => {
      setImagesPerSlide(window.innerWidth >= 768 ? 3 : 1); // md breakpoint
    };

    updateImagesPerSlide();
    window.addEventListener("resize", updateImagesPerSlide);

    return () => window.removeEventListener("resize", updateImagesPerSlide);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + imagesPerSlide) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [imagesPerSlide]);

  // Images for current slide
  const currentImages = Array.from({ length: imagesPerSlide }, (_, i) =>
    images[(startIndex + i) % images.length]
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 justify-center">
        {currentImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className="
              w-full md:w-1/3
              h-[250px] sm:h-[350px] md:h-[500px]
              object-cover
              rounded-lg
            "
          />
        ))}
      </div>
    </div>
  );
}
