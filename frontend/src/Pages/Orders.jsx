import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { MdMessage } from 'react-icons/md';
import useUserStore from "../Store/useUserStore";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => {
          toast.error(`Something went wrong : ${error.message}`);
          console.log(error.message);
          throw error;
        }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/conversations/single/${id}`,
        { withCredentials: true }
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/conversations/`,
          {
            to: currentUser.isSeller ? buyerId : sellerId,
          },
          { withCredentials: true }
        );
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  // useEffect(() => {
  //   console.log(data)
  // },[data])

  return (
    <div className="">
      <div className="w-[90%] mx-auto">
        <div className="font-bold text-4xl my-10 text-blue-900">
          <h1>My Orders</h1>
        </div>
        {isPending && <Loader />}
        {error && <div>{error.message}</div>}

        {!isPending && !error && (
          <>
            {data?.length === 0 && (
              <div className="font-bold text-3xl flex justify-center items-center h-[40vh] text-red-700">
                You don't have any orders yet !
              </div>
            )}

            {data.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {data.map((order) => (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <img src={order.img} alt="Order Image" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{order.title}</h3>
                    <p className="text-gray-800">${order.price}</p>
                    <p className="text-gray-600">{currentUser.isSeller ?  order?.buyerName : order?.sellerName}</p>
                    <button className="mt-4 flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleContact(order)}>
            <MdMessage className="mr-2"/> Contact {currentUser.isSeller ? "Buyer" : "Seller"}
          </button>
                  </div>
                </div>
                ))}
  </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
