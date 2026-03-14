import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-20">

      {/* Header */}
      <div className="flex items-center justify-between w-full mb-12">

        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />

        <button className="flex items-center gap-2 font-medium cursor-pointer group">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow"
            className="group-hover:translate-x-1 transition"
          />
        </button>

      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="relative h-[230px] rounded-xl overflow-hidden text-white group"
          >

            {/* Background Image */}
            <img
              src={item.image}
              alt="offer"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Discount Badge */}
            <p className="absolute top-4 left-4 bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
              {item.priceOff}% OFF
            </p>

            {/* Content */}
            <div className="absolute bottom-5 left-5 right-5">

              <p className="text-xl font-playfair font-semibold">
                {item.title}
              </p>

              <p className="text-sm text-white/90">
                {item.description}
              </p>

              <p className="text-xs text-white/70 mt-1">
                Expires {item.expiryDate}
              </p>

              <button className="flex items-center gap-2 mt-3 text-sm font-medium">
                View Offers
                <img
                  src={assets.arrowIcon}
                  alt="arrow"
                  className="invert group-hover:translate-x-1 transition"
                />
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ExclusiveOffers;