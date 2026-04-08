import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  return (
    <form>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurately room details, price, and amenities to enhance the user booking experience."
      />

      {/* IMAGE UPLOAD */}

      <p className="text-gray-800 mt-10">Images</p>

      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`roomImage${key}`}>
            <img
              className="h-20 w-20 object-cover border rounded-lg cursor-pointer opacity-80 hover:opacity-100"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt="upload"
            />

            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({
                  ...images,
                  [key]: e.target.files[0],
                })
              }
            />
          </label>
        ))}
      </div>

      {/* ROOM TYPE + PRICE */}

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>

          <select
            value={input.roomType}
            onChange={(e) =>
              setInput({
                ...input,
                roomType: e.target.value,
              })
            }
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* PRICE */}

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>

          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({
                ...input,
                pricePerNight: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* AMENITIES */}

      <p className="text-gray-800 mt-4">Amenities</p>

      <div className="flex flex-col flex-wrap mt-1 text-gray-500 max-w-sm">
        {Object.keys(input.amenities).map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={input.amenities[amenity]}
              onChange={() =>
                setInput({
                  ...input,
                  amenities: {
                    ...input.amenities,
                    [amenity]: !input.amenities[amenity],
                  },
                })
              }
            />

            <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
