import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {

  const cities = [
    "New York",
    "London",
    "Paris",
    "Dubai",
    "Tokyo",
    "Delhi",
    "Mumbai"
  ];

  return (
    <div className="flex flex-col items-start justify-center px-4 sm:px-6 md:px-16 lg:px-24 text-white bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center min-h-screen">

      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-24 text-sm">
        The Ultimate Hotel Experience
      </p>

      <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>

      <p className="max-w-xl mt-3 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive hotels
        and resorts. Start your journey today.
      </p>

      <form className="bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 mt-8 flex flex-col md:flex-row gap-4 w-full md:w-auto">

        {/* Destination */}
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2">
            <img src={assets.calendarIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full md:w-40 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />

          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2">
            <img src={assets.calendarIcon} alt="" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>

          <input
            id="checkIn"
            type="date"
            className="w-full md:w-40 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check Out */}
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2">
            <img src={assets.calendarIcon} alt="" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>

          <input
            id="checkOut"
            type="date"
            className="w-full md:w-40 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className="flex md:flex-col max-md:gap-2 max-md:items-center w-full md:w-auto">
          <label htmlFor="guests">Guests</label>

          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="w-full md:w-20 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="0"
          />
        </div>

        {/* Search Button */}
        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white cursor-pointer w-full md:w-auto">
          <img src={assets.searchIcon} alt="searchIcon" className="h-4" />
          <span>Search</span>
        </button>

      </form>

    </div>
  );
};

export default Hero;