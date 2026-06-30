import React, { useCallback, useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAuth } from "@clerk/react";
import { API_URL } from "../../lib/api";

const ListRoom = () => {
  const { getToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/rooms/owner`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setRooms(data.rooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const toggleAvailability = async (roomId) => {
    try {
      const response = await fetch(`${API_URL}/api/rooms/toggle-availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({ roomId }),
      });
      const data = await response.json();

      if (data.success) {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room._id === roomId
              ? { ...room, isAvailable: !room.isAvailable }
              : room,
          ),
        );
      } else {
        alert(data.message || "Unable to update availability.");
      }
    } catch (error) {
      alert(`Unable to update availability: ${error.message}`);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading rooms...</div>;

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listing"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="w-full max-w-3xl mx-auto text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>

              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>

              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price / Night
              </th>

              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.length > 0 ? rooms.map((item) => (
              <tr key={item._id}>
                {/* ROOM TYPE */}

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>

                {/* FACILITY */}

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {Array.isArray(item.amenities)
                    ? item.amenities.join(", ")
                    : Object.keys(item.amenities)
                        .filter((key) => item.amenities[key])
                        .join(", ")}
                </td>

                {/* PRICE */}

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ₹ {item.pricePerNight}
                </td>

                {/* ACTIONS TOGGLE SWITCH */}

                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      onChange={() => toggleAvailability(item._id)}
                    />

                    <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>

                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-500">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
