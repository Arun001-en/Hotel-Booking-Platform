import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "#about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const shouldUseScrolledStyle = !isHomePage || isScrolled;

  const handleSearch = (event) => {
    event.preventDefault();
    const city = searchQuery.trim();
    navigate(city ? `/rooms?city=${encodeURIComponent(city)}` : "/rooms");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
      ${
        shouldUseScrolledStyle
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${shouldUseScrolledStyle ? "invert opacity-80" : ""}`}
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              shouldUseScrolledStyle ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                shouldUseScrolledStyle ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}

        <button
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
            shouldUseScrolledStyle ? "text-black" : "text-white"
          } transition-all`} onClick={()=> navigate('/owner')}
        >
          Dashboard
        </button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <form
          onSubmit={handleSearch}
          className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ${
            shouldUseScrolledStyle
              ? "border-gray-300 bg-white"
              : "border-white/60 bg-white/10"
          } ${isSearchOpen ? "w-56 px-3 py-1.5" : "w-9 border-transparent"}`}
        >
          {isSearchOpen && (
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search city"
              className={`w-full bg-transparent text-sm outline-none ${
                shouldUseScrolledStyle
                  ? "text-gray-700 placeholder:text-gray-400"
                  : "text-white placeholder:text-white/70"
              }`}
              autoFocus
            />
          )}

          <button
            type={isSearchOpen ? "submit" : "button"}
            aria-label="Search rooms"
            onClick={() => {
              if (!isSearchOpen) setIsSearchOpen(true);
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center cursor-pointer"
          >
            <img
              src={assets.searchIcon}
              alt=""
              className={`${shouldUseScrolledStyle && "invert"} h-5 transition-all duration-500`}
            />
          </button>
        </form>

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              shouldUseScrolledStyle ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
        
      <div className="flex items-center gap-3 md:hidden">
        {user && <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt=""
          className={`${shouldUseScrolledStyle && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <form onSubmit={handleSearch} className="flex w-64 items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search city"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button type="submit" aria-label="Search rooms" className="cursor-pointer">
            <img src={assets.searchIcon} alt="" className="h-5 invert" />
          </button>
        </form>

        {user && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={()=> navigate('/owner')}>
          Dashboard
        </button>}

        {!user && <button
          onClick={openSignIn}
          className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
        >
          Login
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;
