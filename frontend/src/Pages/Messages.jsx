import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-hot-toast";
import useUserStore from "../Store/useUserStore";

const Messaages = () => {
  const currentUser = useUserStore((state) => state.currentUser);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => {
          toast.error(error.message);
          throw error;
        }),
  });

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/conversations/${id}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRead = (id) => {
    mutate(id);
  };

  return (
    <div className="messages">
      {isPending ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="w-[90%] mx-auto ">
          <div className="font-bold text-4xl my-10 text-blue-900">
            <h1>Messages</h1>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen ">
            <div className="w-full max-w-4xl ">
              {data.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="/images/noavatar.jpg"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        {currentUser.isSeller ? c?.buyerName : c.sellerName}
                      </div>
                      <div>{c?.lastMessage?.substring(0, 40)}...</div>
                      <div className="text-sm text-gray-500">
                        {moment(c.updatedAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {(currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer) ? (
                      <button
                        onClick={() => handleRead(c.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                      >
                        Mark as Read
                      </button>
                    ) : (
                      <Link
                        to={{
                          pathname: `/message/${c.id}`,
                        }}
                        className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                      >
                        Open Chat
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Messaages;
