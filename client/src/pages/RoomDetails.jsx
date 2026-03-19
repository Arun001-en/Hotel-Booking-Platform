import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id.toString() === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  if (!room) return null;

  return (
    <div className="mt-32 py-8 px-6 md:px-16 lg:px-24 xl:px-32">

      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name}
          <span className="font-inter text-sm"> ({room.roomType})</span>
        </h1>

        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2">
        <StarRating rating={room.hotel?.rating} />
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel?.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="Room"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.map((image, index) => (
            <img
              key={index}
              onClick={() => setMainImage(image)}
              src={image}
              alt="Room"
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image ? "outline outline-2 outline-orange-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-playfair">
            Experience Luxury Like Never Before
          </h1>

          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
      </div>

      {/* Booking Form */}
      <form className="flex flex-col md:flex-row md:items-end justify-between bg-white shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 rounded-xl max-w-6xl mx-auto mt-16 gap-6">

        <div className="flex flex-col">
          <label className="font-medium">Check-In</label>
          <input
            type="date"
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            required
          />
        </div>

        <div className="w-px h-12 bg-gray-300 max-md:hidden"></div>

        <div className="flex flex-col">
          <label className="font-medium">Check-Out</label>
          <input
            type="date"
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            required
          />
        </div>

        <div className="w-px h-12 bg-gray-300 max-md:hidden"></div>

        <div className="flex flex-col">
          <label className="font-medium">Guests</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md px-10 py-3 md:py-4 text-base cursor-pointer"
        >
          Check Availability
        </button>

      </form>

      {/* Common Specifications */}
      <div className="mt-20 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-3">
            <img src={spec.icon} alt={spec.title} className="w-6" />
            <div>
              <p className="font-medium">{spec.title}</p>
              <p className="text-gray-500 text-sm">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl border-y border-gray-300 my-12 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to availability.
          The price quoted is for two guests. Please mark the number of guests
          according to price for groups. You get a comfortable two bedroom
          apartment that has a true city feeling.
        </p>
      </div>

      {/* Hosted By */}
      <div className="flex flex-col items-start gap-4">

        <div className="flex gap-4 items-center">

          {/* Circle Logo */}
          <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <img
              src={room.hotel?.owner?.image}
              alt="Host"
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <p className="font-medium text-lg">
              Hosted by {room.hotel?.name}
            </p>

            <div className="flex items-center mt-1">
              <StarRating rating={room.hotel?.rating} />
              <p className="ml-2 text-sm text-gray-500">200+ reviews</p>
            </div>
          </div>

        </div>
         <button className="px-6 py-2.5 mt-4 rounded text-white bg primary hover:bg--primary-dull transition-all cursor pointer">Contact Now</button>

      </div>

    </div>
  );
};

export default RoomDetails;