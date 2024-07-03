import React, { useEffect, useState,useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("currentUser");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      localStorage.removeItem("currentUser");
      toast.success("Logged out successfully");

      navigate("/");


      console.log(err);
    }
  };


  

  return (
    <div
    className={
      "z-50 transition-all ease-in-out duration-500 sm:fixed w-full h-[5rem] border-red-800" +
      (active || pathname !== "/"
        ? " text-gray-700 bg-white"
        : " bg-[#1A1B1D] text-white ")
    }
  >
      <Toaster />
      <div className="flex justify-between max-w-[90%] mx-auto p-4">
        <div className="text-3xl font-bold ">
          <Link to="/">
            <span className="">GigVerse</span>
          </Link>
          <span className="text-4xl text-blue-400">.</span>
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
                className="flex items-center gap-5 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(!open)

                }}
              >
                <img
                  src={currentUser.img || "/images/noavatar.jpg"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span>{currentUser.fullname}</span>
              </div>

              {open && (
                <div
                ref={popupRef}
                  className="absolute top-18 border-2 
                    bg-white text-gray-700 p-3 rounded-lg flex flex-col shadow-lg w-max z-10"
                >
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/gigs" onClick={(event) => {event.stopPropagation(); setOpen(false);}}>
                        Gigs
                      </Link>
                      <Link to="/addgigs" onClick={(event) => {event.stopPropagation(); setOpen(false);}}>
                        Add new Gigs
                      </Link>
                    </>
                  )}
                  <Link to="/orders" onClick={(event) => {event.stopPropagation(); setOpen(false);}}>
                    Orders
                  </Link>
                  <Link to="/messages" onClick={(event) => {event.stopPropagation(); setOpen(false);}}>
                    Messages
                  </Link>
                  <Link
                    to="/"
                    onClick={(event) => {
                      handleLogout();
                      event.stopPropagation(); 
                      setOpen(false);
                    }}
                  >
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
        <div className="bg-white hidden sm:block" >
          <hr className="pt-1" />
          <div className="max-w-[90%] mx-auto">
            <div className="flex justify-between">
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Graphics & Design
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Programming & Tech
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Digital Marketing
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Video & Animation
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Writing & Translation
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Music & Audio
              </span>
              <span className="border-b-[3px] border-transparent hover:border-b-[3px] hover:border-b-blue-900 cursor-pointer">
                Business
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
