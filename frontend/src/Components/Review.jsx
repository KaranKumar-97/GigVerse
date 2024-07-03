import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Review = ({ review }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/${review.userId}`)
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.data.error) toast.error(error.response.data.error);
          console.log(error);
          throw error;
        }),
  });

  // useEffect(() => {
  //   // Example condition: Only log if data has more than 0 items
  //   if (data) {
  //     console.log("user data:", data);
  //   }
  //   if (error) {
  //     console.log("Error updated:", error);
  //   }
  // }, [data, error]);

  return (
    <div className="">
      {isPending && <p>Loading...</p>}

      {error && <p>{error}</p>}

 

      {!isPending && !error && (
        <div className="flex items-center gap-2">
          <img
            src={data.img || "/images/noavatar.jpg"}
            className="w-[40px] h-[40px] rounded-full"
            alt=""
          />

          <p className="text-xl font-medium">{data.fullname}</p>
        </div>
      )}
      <div className="flex gap-1 my-3">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/images/star.png" className="w-[15px]" alt="" key={i} />
          ))}
      </div>

      <div className="mt-3">{review.desc}</div>

      <div className="flex items-center gap-5 my-3">
        <p className="font-semibold">Helpful ?</p>
        <div className="flex gap-1 cursor-pointer">
          <img src="/images/like.png" className="w-[20px]" alt="" />
          <p>Yes</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <img src="/images/dislike.png" className="w-[20px]" alt="" />
          <p>No</p>
        </div>
      </div>
      <hr className="mt-10 border-gray-300" />
    </div>
  );
};

export default Review;
