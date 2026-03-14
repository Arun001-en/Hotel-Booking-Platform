import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={'/rooms/' + room._id}
      onClick={() => scrollTo(0, 0)}
      className="relative max-w-[280px] w-full rounded-xl overflow-hidden bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-300"
    >

      {/* Hotel Image */}
      <img
        src={room.images[0]}
        alt="hotel"
        className="w-full h-44 object-cover"
      />

      {/* Best Seller Badge */}
      {index % 2 === 0 && (
        <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full shadow">
          Best Seller
        </p>
      )}

      {/* Card Content */}
      <div className="p-4 pt-5">

        {/* Hotel Name + Rating */}
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>

          <div className="flex items-center gap-1 text-sm">
            <img src={assets.starIconFilled} alt="star" className="h-4" />
            4.5
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <img src={assets.locationIcon} alt="location" className="h-4" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              ${room.pricePerNight}
            </span>{" "}
            /night
          </p>

          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
            Book Now
          </button>
        </div>

      </div>

    </Link>
  )
}

export default HotelCard