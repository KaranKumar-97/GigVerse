import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GigCard = ({ item }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/${item.userId}`)
        .then((res) => res.data)
        .catch((error) => {
          toast.error(error.message);
          throw error;
        }),
  });

  // useEffect(() => {
  //   // Example condition: Only log if data has more than 0 items
  //   if (data) {
  //     console.log("Data updated:", data);
  //   }
  //   if (error) {
  //     console.log("Error updated:", error);
  //   }
  // }, [data, error]);


  return (
    <div className="max-w-[270px] my-5 mx-4 hover:scale-[101%] hover:shadow-2xl">
      <Link to={`/gig/${item._id}`}>
        <div className="shadow-lg border border-gray-300 rounded-lg p-1 rounded-b-lg h-full cursor-pointer flex flex-col">
          <img
            src={item.cover}
            className="object-cover h-[270px] rounded-t-lg  "
            alt=""
          />
          {!isPending && !error &&  (
             <div className="text-xs flex items-center gap-3 pt-2 px-3">
             <img src={data.img || "/images/noavatar.jpg"}  className='w-[40px] h-[40px] rounded-full' alt="" />
             <p>{data?.fullname}</p>
           </div>

          )}
         
          <div className="text-sm px-4">
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="pb-2">{item.desc}</p>
            <div className="flex items-center gap-2">
              <img src="/images/star.png" className="w-5" alt="" />
              <p className="text-[#ffc108] py-1">{!isNaN(Math.round(item.totalStar/item.starNumber)) && Math.round(item.totalStar/item.starNumber)} stars</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-4 py-2">
            <img src="/images/heart.png" alt="" />
            <p>{item.price} Rs.</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;
