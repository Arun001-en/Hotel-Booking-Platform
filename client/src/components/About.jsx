import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Side */}
        <div className="lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
            alt="Luxury Hotel"
            className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
          />
          <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-xl hidden md:block">
            <p className="text-4xl font-bold">15+</p>
            <p className="text-sm">Years of Excellence</p>
          </div>
        </div>

        {/* Text Side */}
        <div className="lg:w-1/2">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
            About Our Platform
          </h2>
          <h1 className="text-4xl md:text-5xl font-playfair mb-6 leading-tight">
            Redefining Luxury & Comfort in Every Stay
          </h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Welcome to our premier hotel booking platform, where we bridge the gap between discerning travelers and world-class hospitality. Our mission is to provide a seamless, transparent, and luxurious booking experience that starts long before you check in.
          </p>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Whether you're looking for a romantic getaway, a family suite, or a professional business hub, our curated selection of hotels ensures that every stay is more than just a room—it's an experience. We prioritize real-time availability, competitive pricing, and verified reviews to give you peace of mind.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Best Price Guarantee</h4>
                <p className="text-sm text-gray-500">Luxury doesn't have to be overpriced.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Real-time Booking</h4>
                <p className="text-sm text-gray-500">Instant confirmation, every time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
