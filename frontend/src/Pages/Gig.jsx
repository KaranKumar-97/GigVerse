import React, { useState, useEffect } from "react";
import Slide from "../Components/Slide";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../Components/Loader";
import Reviews from "../Components/Reviews";
import useUserStore from "../Store/useUserStore";

const Gig = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }, []);

  const param = useParams();
  const gigId = param.id;
  const currentUser = useUserStore((state) => state.currentUser);


  const { isPending, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/gigs/single/${gigId}`)
        .then((res) => res.data)
        .catch((error) => {
          toast.error(`Something went wrong : ${error.message}`);
          console.log(error.message);
          throw error;
        }),
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/${data.userId}`)
        .then((res) => res.data)
        .catch((errorUser) => {
          toast.error(errorUser.message);
          console.log("dss", errorUser.message);
          throw errorUser;
        }),
  });

  const handleOrder =()=>{

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/${gigId}`,{buyerName:currentUser.fullname,sellerName:dataUser.fullname},{withCredentials:true})
      .then((res)=>res.data).then(()=>toast.success("Order Placed Successfully")).then(()=>navigate("/orders"))
      .catch((error)=>{toast.error(error?.response?.data?.error || error.message)})
  }

  // useEffect(() => {
  //   // Example condition: Only log if data has more than 0 items
  //   if (data) {
  //     console.log("DataUser:", data);
  //   }
  //   if (error) {
  //     console.log("Error updated:", error);
  //   }
  // }, [dataUser, errorUser]);

  // useEffect(() => {
  //   // Example condition: Only log if data has more than 0 items
  //   if (data) {
  //     console.log("Data:", data);
  //   }
  //   if (error) {
  //     console.log("Error updated:", error);
  //   }
  // }, [data, error]);

  return (
    <div className="w-[90%] mx-auto flex gap-6">
      {isPending && (
        <div className=" w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {error && (
        <div className="w-full h-[80vh] flex flex-col gap-6 justify-center items-center">
          <p className="text-blue-900 text-4xl font-bold">
            Oops! Soemthing Went Wrong
          </p>
          <p className="text-red-600 text-4xl font-bold">{error.message}</p>
          <button
            className="px-6 py-4 bg-blue-900 text-white rounded-lg"
            onClick={() => navigate("/")}
          >
            Take me to Home Page
          </button>
        </div>
      )}

      {!isPending && !error && (
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* left */}
          <div className="md:mt-10 mb-8 space-y-3 w-[90vw] md:w-[58vw]">
            <p className="flex gap-2">
              <img src="/images/home.svg" alt="" /> {"/  "}GigVerse {">"}{" "}
              {data.category}
            </p>

            <h1 className="font-bold text-2xl">{data.title}</h1>

            {isPendingUser && (
              <>
                <p className="py-5">Loading user Info...</p>
              </>
            )}

            {!isPendingUser && (
              <div className="flex items-center gap-2">
                <img
                  src={dataUser.img || "/images/noavatar.jpg"}
                  className="w-[50px] h-[50px] border-2 object-cover rounded-full"
                  alt=""
                />
                <p>{dataUser.fullname}</p>
                {!isNaN(Math.round(data.totalStar / data.starNumber)) && (
                  <>
                    <div className="flex gap-1">
                      {Array(Math.round(data.totalStar / data.starNumber))
                        .fill()
                        .map((_, index) => (
                          <img
                            key={index}
                            src="/images/star.png"
                            className="w-[15px]"
                            alt=""
                          />
                        ))}
                    </div>
                    <p className="text-[#ffc108]">
                      {Math.round(data.totalStar / data.starNumber)} Stars
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="border p-2  rounded-xl">
              <Slide slidesToShow={1} arrowsScroll={1}>
                {data.images.map((img, index) => (
                  <div className="flex items-center h-full" key={index}>
                    <img
                      className="object-contain mx-auto  max-h-[500px]"
                      src={img}
                      alt=""
                    />
                  </div>
                ))}
              </Slide>
            </div>

            <div className="w-[90vw] md:w-[30vw] border border-gray-400 rounded-lg p-6 h-auto mt-10  block md:hidden">
            <div className="flex justify-between text-xl mb-5">
              <p className="font-semibold">{data.shortTitle}</p>
              <p>₹{data.price} INR</p>
            </div>
            <p>{data.shortDesc}</p>
            <div className="flex justify-between my-5">
              <div className="flex items-center gap-2">
                <img
                  src="/images/clock.png"
                  className="w-[20px] h-[20px]"
                  alt=""
                />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/images/recycle.png"
                  className="w-[20px] h-[20px]"
                  alt=""
                />
                <span>{data.revision} Revisions</span>
              </div>
            </div>

            {data.features.length > 0 &&
              data.features?.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <img
                    src="/images/greencheck.png"
                    className="w-[20px] h-[20px]"
                    alt=""
                  />
                  <p>{item}</p>
                </div>
              ))}

            <button className="w-full py-3 bg-blue-900 rounded-lg mt-8 text-white font-semibold" onClick={handleOrder}>
              Request to Order
            </button>
          </div>

            <div className="">
              <h1 className="text-2xl font-semibold">About this Gig</h1>
              <p>{data.desc}</p>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">What's included</h1>
              <ul className="flex flex-col ml-5 justify-between list-disc">
                <li>High Resolution</li>
                <li>Source File</li>
                <li>Commercial Use</li>
              </ul>
            </div>

            {!isPendingUser && !errorUser && (
              <div>
                <h1 className="text-2xl font-bold my-8">About the Seller</h1>
                <div className="flex items-center gap-8">
                  <img
                    src={dataUser.img || `/images/noavatar.jpg`}
                    className="w-[120px] h-[120px] border-2 object-cover rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-semibold">{dataUser.fullname}</p>

                    <div className="flex gap-1">
                      {!isNaN(Math.round(data.totalStar / data.starNumber)) && (
                        <>
                          <div className="flex gap-1">
                            {Array(Math.round(data.totalStar / data.starNumber))
                              .fill()
                              .map((_, index) => (
                                <img
                                  key={index}
                                  src="/images/star.png"
                                  className="w-[15px]"
                                  alt=""
                                />
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                    <button className="px-4 py-2 border border-gray-800 rounded-lg ">
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="border border-gray-400 rounded-lg p-6 my-10">
                  <div className="grid grid-cols-2">
                    <div>
                      <p>From</p>
                      <p className="font-semibold">India</p>
                    </div>
                    <div>
                      <p className="title">Member since</p>
                      <p className="font-semibold">Aug 2022</p>
                    </div>
                    <div>
                      <p className="title">Avg. response time</p>
                      <p className="font-semibold">4 hours</p>
                    </div>
                    <div>
                      <p className="title">Last delivery</p>
                      <p className="font-semibold">1 day</p>
                    </div>
                    <div>
                      <p className="title">Languages</p>
                      <p className="font-semibold">English</p>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias commodi placeat pariatur quasi nihil reiciendis
                    excepturi aliquid odit rem sequi.
                  </p>
                </div>
              </div>
            )}

            <Reviews gigId={gigId} />
          </div>

          {/* right */}
          <div className="w-[90vw] md:w-[30vw] border border-gray-400 rounded-lg p-6 h-auto mt-10 sticky top-[10rem] hidden md:block">
            <div className="flex justify-between text-xl mb-5">
              <p className="font-semibold">{data.shortTitle}</p>
              <p>₹{data.price} INR</p>
            </div>
            <p>{data.shortDesc}</p>
            <div className="flex justify-between my-5">
              <div className="flex items-center gap-2">
                <img
                  src="/images/clock.png"
                  className="w-[20px] h-[20px]"
                  alt=""
                />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/images/recycle.png"
                  className="w-[20px] h-[20px]"
                  alt=""
                />
                <span>{data.revision} Revisions</span>
              </div>
            </div>

            {data.features.length > 0 &&
              data.features?.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <img
                    src="/images/greencheck.png"
                    className="w-[20px] h-[20px]"
                    alt=""
                  />
                  <p>{item}</p>
                </div>
              ))}

            <button className="w-full py-3 bg-blue-900 rounded-lg mt-8 text-white font-semibold" onClick={handleOrder}>
              Request to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
