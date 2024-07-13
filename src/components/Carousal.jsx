import { Carousel } from "@material-tailwind/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function CarouselE() {
  return (
    <div className="relative">
      <Carousel
        swipe={true} // Enable swipe navigation
        infinite={true} // Infinite loop of images
        className="rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-[430px] w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-[430px] w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-[430px] w-full object-cover"
        />
      </Carousel>

      {/* Search Input */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto">
        <div className="flex items-center justify-center w-full rounded bg-black ">
          <input
            className="w-full px-4 py-2 text-white placeholder-gray-400 bg-black border border-gray-300 rounded-l outline-none focus:outline-none  "
            type="search"
            name="search"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="rounded-l-none bg-black px-4 py-2 text-white border"
          >
            <FaSearch className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
