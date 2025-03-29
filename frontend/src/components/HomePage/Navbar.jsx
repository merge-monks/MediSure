import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
  ];

  const dropdownLinks = [
    { name: "View Profile", path: "/viewprofile" },
    { name: "Logout", path: "/logout" },
  ];

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <div className="top-0 max-w-7xl sticky pt-2 border-b border-muted/30 lg:pt-4 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200 container mx-auto px-4 sm:px-6 lg:px-8 py-4 z-40 bg-white backdrop-blur-lg">
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md flex items-center justify-center">
              <div className="h-6 w-6 pb-2 text-3xl flex items-center justify-center font-extrabold leading-none m">
                +
              </div>
            </div>

            <h1 className="font-bold text-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">MediSure</h1>
          </div>
        </Link>
        <div className="flex items-center">
          <nav className="hidden lg:flex gap-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={clsx(
                  "hover:text-cyan-500 dark:hover:text-cyan-400",
                  "text-black"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isOpen}
              className="focus:outline-none"
            ></button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className="right-0 mt-2 absolute w-32 bg-slate-300 rounded-md shadow-lg z-10 text-[#0B1120] "
              >
                {dropdownLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="lg:hidden ml-4">
            <button
              onClick={() => console.log("Open Mobile Menu")}
              className="text-black"
            >
              ☰
            </button>
            {mobileMenuOpen && (
              <nav className="absolute top-full left-0 w-full bg-[#0B1120] z-50">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;