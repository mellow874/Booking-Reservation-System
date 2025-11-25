import React, { useState, useEffect } from "react";

// images
import buff1 from '../assets/buff1.jpg';
import buff2 from '../assets/buff2.jpg';
import buff3 from '../assets/buff3.jpg';
import buff4 from '../assets/buff4.jpg';
import buff5 from '../assets/buff5.jpg';
import buff6 from '../assets/buff6.jpg';
import buff7 from '../assets/buff7.jpg';
import buff8 from '../assets/buff8.jpg';
import buff9 from '../assets/buff9.jpg';

const images = [buff1, buff2, buff3, buff4, buff5, buff6, buff7, buff8, buff9];

export default function AutoCarousel() {
  const [startIndex, setStartIndex] = useState(0);

  // Automatically change images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 3) % images.length); 
      // +3 because you show 3 images at a time
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Get 3 images for current slide
  const currentImages = [
    images[startIndex],
    images[(startIndex + 1) % images.length],
    images[(startIndex + 2) % images.length],
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {currentImages.map((img, idx) => (
        <img key={idx} src={img} alt={`Slide ${idx}`} style={{ width: "600px", height: "500px", objectFit: "cover"  }} />
      ))}
    </div>
  );
}
