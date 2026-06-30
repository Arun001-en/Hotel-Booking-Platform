import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const citySearch = searchParams.get("city") || "";

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

  const priceRanges = [
    { label: "0 to 500", min: 0, max: 500 },
    { label: "500 to 1000", min: 500, max: 1000 },
    { label: "1000 to 2000", min: 1000, max: 2000 },
    { label: "2000 to 3000", min: 2000, max: 3000 },
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High To Low",
    "Newest First",
  ];

  const toggleRoomType = (checked, label) => {
    if (checked) {
      setSelectedRoomTypes((prev) => [...prev, label]);
    } else {
      setSelectedRoomTypes((prev) => prev.filter((item) => item !== label));
    }
  };

  const togglePriceRange = (checked, label) => {
    if (checked) {
      setSelectedPriceRanges((prev) => [...prev, label]);
    } else {
      setSelectedPriceRanges((prev) => prev.filter((item) => item !== label));
    }
  };

  const filteredRooms = roomsDummyData.filter((room) => {
    // Check if the room is blocked in localStorage
    const blockedRooms = JSON.parse(localStorage.getItem('blockedRooms') || '[]');
    if (blockedRooms.includes(room._id.toString())) {
      return false; // Don't show blocked rooms
    }

    const matchesCity = citySearch === "" || room.hotel.city.toLowerCase().includes(citySearch.toLowerCase());

    const matchesType =
      selectedRoomTypes.length === 0 || selectedRoomTypes.includes(room.roomType);

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((rangeLabel) => {
        const range = priceRanges.find((r) => r.label === rangeLabel);
        return room.pricePerNight >= range.min && room.pricePerNight <= range.max;
      });

    return matchesCity && matchesType && matchesPrice;
  }).sort((a, b) => {
    if (sortOption === "Price Low to High") return a.pricePerNight - b.pricePerNight;
    if (sortOption === "Price High To Low") return b.pricePerNight - a.pricePerNight;
    return 0;
  });

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

        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6
              border-b border-gray-300 last:pb-0 last:border-0"
            >
              {/* Image */}
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
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
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-xl font-playfair cursor-pointer"
                >
                  {room.hotel.name}
                </p>

                {/* Rating */}
                <div className="flex items-center">
                  <StarRating rating={room.hotel.rating} />
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
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-medium">No rooms match your criteria.</p>
            <button 
              onClick={() => {
                setSelectedRoomTypes([]);
                setSelectedPriceRanges([]);
                setSortOption("");
                setCitySearch("");
                setSearchParams({});
              }}
              className="mt-4 text-primary underline"
            >
              Clear all filters
            </button>
          </div>
        )}
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

          <span 
            className="text-sm cursor-pointer"
            onClick={() => {
              setSelectedRoomTypes([]);
              setSelectedPriceRanges([]);
              setSortOption("");
              setCitySearch("");
              setSearchParams({});
            }}
          >
            CLEAR
          </span>
        </div>

        {/* Filter Content */}
        <div
          className={`${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* City Search */}
          <div className="px-5 pt-5 pb-2">
            <p className="font-medium text-gray-800 pb-2">City</p>
            <input
              type="text"
              placeholder="Search by city..."
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                if (e.target.value) {
                  setSearchParams({ city: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Room Type */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox 
                key={index} 
                label={room} 
                selected={selectedRoomTypes.includes(room)}
                onChange={toggleRoomType}
              />
            ))}
          </div>

          {/* Price Range */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox 
                key={index} 
                label={range.label} 
                selected={selectedPriceRanges.includes(range.label)}
                onChange={togglePriceRange}
              />
            ))}
          </div>

          {/* Sort Options */}
          <div className="px-5 pt-5 pb-6">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton 
                key={index} 
                label={option} 
                selected={sortOption === option}
                onChange={setSortOption}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
