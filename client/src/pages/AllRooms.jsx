import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High To Low",
    "Newest First",
  ];

  return (
    <div
      className="flex flex-col-reverse lg:flex-row gap-10
      pt-28 md:pt-35 px-4 md:px-16 lg:px-24"
    >
      {/* HOTEL LIST */}
      <div className="w-full lg:w-3/4">
        <div className="flex flex-col items-start text-left mb-8">
          <h1 className="font-playfair text-4xl md:text-[40px]">
            Hotels Rooms
          </h1>

          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:pb-0 last:border-0"
          >
            {/* Image */}
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />

            {/* Details */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>

              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-800 text-xl font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>

              {/* Rating */}
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5F7]/70"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              {/* Price */}
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight} / night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER SIDEBAR */}
      <div
        className="w-full lg:w-1/4 bg-white border border-gray-300
        text-gray-600 rounded-lg h-fit"
      >
        {/* Filter Header */}
        <div
          className={`flex items-center justify-between px-5 py-3
          lg:border-b border-gray-300 ${openFilters && "border-b"}`}
        >
          <p className="font-medium">FILTERS</p>

          <span
            onClick={() => setOpenFilters(!openFilters)}
            className="lg:hidden cursor-pointer"
          >
            {openFilters ? "HIDE" : "SHOW"}
          </span>

          <span className="text-sm cursor-pointer">CLEAR</span>
        </div>

        {/* Filter Content */}
        <div
          className={`${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* Room Type */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>

          {/* Price Range */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`} />
            ))}
          </div>

          {/* Sort Options */}
          <div className="px-5 pt-5 pb-6">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
