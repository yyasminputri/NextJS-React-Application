"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/logo.png";

export const Hero = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -300, // Geser 300px ke kiri
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 300, // Geser 300px ke kanan
      behavior: "smooth",
    });
  };

  const foodData = [
    { id: 1, image: "/img/l2.png", title: "🍿 Snacks ", rating: "★★★★★" },
    { id: 2, image: "/img/l3.png", title: "🥣 Healthy Bowls ", rating: "★★★★☆" },
    { id: 3, image: "/img/l4.png", title: "🍣 Appetizers ", rating: "★★★★★" },
    { id: 4, image: "/img/l5.png", title: "🥞 Breakfast ", rating: "★★★★☆" },
    { id: 5, image: "/img/l1.png", title: "🍛 Main Dishes ", rating: "★★★★★" },
    { id: 6, image: "/img/l2.png", title: "🍿 Snacks ", rating: "★★★★★" },
  ];

  return (
    <>
      {/* Hero Section */}
      <Container className="flex flex-wrap font-poppins">
        {/* Left Section */}
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            {/* Title with Gradient */}
            <h1 className="text-2xl font-bold leading-snug tracking-tight lg:text-3xl xl:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400">
              🌟 Find Your Next Favorite Recipe 🌟
            </h1>
            {/* Subtitle */}
            <p className="py-4 text-sm leading-normal text-gray-500 lg:text-base xl:text-lg dark:text-gray-300 ">
              Powerpuff Recipe is the best place to discover, share, and create
              your favorite recipes. Easy to use for everyone, anytime, anywhere!
            </p>

            {/* Button */}
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                target="_blank"
                rel="noopener"
                className="px-6 py-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-all duration-300">
                🍳 Start Cooking Now
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="w-full max-w-lg">
            <Image
              src={heroImg}
              width={500}
              height={500}
              className="rounded-lg"
              alt="My Logo"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>

      {/* Food Slider Section */}
      <Container font-poppins>
        <div className="relative w-full mt-10">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Explore Our Top Recipe Categories!  🍹
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-4 mt-8 overflow-x-scroll scrollbar-hide scroll-smooth">
            {foodData.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-60 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                {/* Text */}
                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.rating}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-500 transition-all">
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-500 transition-all">
            &gt;
          </button>
        </div>
      </Container>
    </>
  );
};
