import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "../Store/useUserStore";
import { FaArtstation } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);

  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      logout();
      toast.success("Logged out successfully");

      navigate("/");
      console.log(err);
    }
  };


  const categories = [
    "Graphics & Design",
    "Programming & Tech",
    "AI Services",
    "Video & Animation",
    "Writing & Translation",
    "Digital Marketing",
    "Music & Audio",
  ];


  return (
    <div
      className={
        "z-50 transition-all ease-in-out duration-500 sm:fixed w-full h-[5rem]" +
        (active || pathname !== "/"
          ? " text-gray-700 bg-white"
          : " bg-[#1A1B1D] text-white ")
      }
    >
      <Toaster />
      <div className="flex justify-between max-w-[90%] mx-auto p-4">
        <div className="text-xl sm:text-3xl font-bold ">
          <Link to="/"> 
            <span className="">GigVerse</span>
          </Link>
          <span className="text-2xl sm:text-4xl text-blue-400">.</span>
        </div>

        <div className="flex items-center gap-5 font-semibold">
          {/* <span>Fiverr Bussiness</span>
          <span>Explore</span>
          <span>English</span> */}

          {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}

          {!currentUser && (
            <button
              className="border border-blue-900 hover:bg-blue-900 hover:text-white rounded-lg px-2 py-1"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}

          {currentUser && (
            <div className="relative">
              <div
                className="flex items-center gap-2 sm:gap-5 cursor-pointer"
                onClick={(event) => {
                  setOpen(!open);
                }}
                onTouchMove={() => {
                  setOpen(!open);
                }}
              >
                <img
                  src={currentUser.img || "/images/noavatar.jpg"}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 object-cover rounded-full"
                />
                <span className="text-sm sm:text-base">{currentUser.fullname}</span>
              </div>

              {open && (
                <div
                  ref={popupRef}
                  className="absolute top-18 -right-7 md:-right-14 mt-2 border-2 bg-white text-gray-700 py-2 rounded-lg shadow-lg w-48 z-10 transition duration-200 ease-out"
                >
                  {currentUser?.isSeller && (
                    <>
                      <Link
                        to="mygigs"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <FaArtstation />
                        My Gigs
                      </Link>
                      <Link
                        to="/addgigs"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <FaPlus />
                        Add New Gigs
                      </Link>
                    </>
                  )}
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <FiShoppingBag />
                    Orders
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <FiMessageSquare />
                    Messages
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    <FiLogOut />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {active && (
        // (active || pathname!=="/")
        <div className="bg-white hidden sm:block">
          <hr className="pt-1" />
          <div className="max-w-[90%] mx-auto">
            <div className="flex gap-1 justify-between">

              {categories.map((category,i) => (
                <Link to={`/gigs?category=${category}`} key={i} className="border-b-[3px] text-sm border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                {category}
              </Link>
              ))}
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
