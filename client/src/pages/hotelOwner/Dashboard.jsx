import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAuth } from "@clerk/react";

const Dashboard = () => {
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bookings/owner-dashboard", {
        headers: {
          // Authorization: `Bearer ${await getToken()}` // If needed by clerkMiddleware on backend
        }
      });
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // "Real-time" polling every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Top Cards */}
      <div className="flex gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="Total Booking"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Booking</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="Total Revenue"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl mx-auto text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                User Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Type
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {dashboardData.bookings.length > 0 ? (
              dashboardData.bookings.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-3 text-gray-700 border-t border-gray-300">
                    {item.user?.username || "Unknown User"}
                  </td>

                  <td className="py-3 px-3 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {item.room?.roomType || "N/A"}
                  </td>

                  <td className="py-3 px-3 text-gray-700 border-t border-gray-300 text-center">
                    ${item.totalPrice}
                  </td>

                  <td className="py-3 px-3 border-t border-gray-300">
                    <button
                      className={`py-1 px-3 text-xs rounded-full mx-auto block ${
                        item.isPaid
                          ? "bg-green-200 text-green-600"
                          : "bg-amber-200 text-yellow-600"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;