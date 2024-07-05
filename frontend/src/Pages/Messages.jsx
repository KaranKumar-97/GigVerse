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
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/conversations`,{withCredentials:true}).then((res) => res.data
      ).catch((error) => {
        toast.error(error.message);
        throw error;
      }),
  });

  const {mutate} = useMutation({
    mutationFn: (id) => {
      return axios.put(`${import.meta.env.VITE_BACKEND_URL}/conversations/${id}`,{},{withCredentials:true});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const handleRead = (id) => {
    mutate(id);
  };


  useEffect(() => {console.log(data)}, []);
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
        <table className="w-[90%] mx-auto ">
          <tr>
            <th className="bg-blue-900 text-white p-3 border-2 rounded-l-xl border-white">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th className="bg-blue-900 text-white p-3 border-2 border-white">Last Message</th>
            <th className="bg-blue-900 text-white p-3 border-2 border-white">Date</th>
            <th className="bg-blue-900 text-white p-3 border-2 rounded-r-xl border-white">Action</th>
          </tr>
          {data.map((c) => (
            <tr
              className={
                ((currentUser.isSeller && !c.readBySeller) ||
                  (!currentUser.isSeller && !c.readByBuyer)) &&
                "bg-green-100"
              }
              key={c.id}
            >
              <td className="border-2 p-3 text-center">{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
              <td className="border-2 p-3 text-center">
                <Link to={`/message/${c.id}`} className="link">
                  {c?.lastMessage?.substring(0, 40)}...
                </Link>
              </td>
              <td className="border-2 p-3 text-center">{moment(c.updatedAt).fromNow()}</td>
              <td className="border-2 p-3 text-center">
                {((currentUser.isSeller && !c.readBySeller) ||
                  (!currentUser.isSeller && !c.readByBuyer)) ? (
                  <button onClick={() => handleRead(c.id)} className="bg-green-500 p-1 rounded-xl">
                    Mark as Read
                  </button>
                ) :(
                  <Link to={`/message/${c.id}`} className="bg-blue-800 p-2 rounded-xl text-white">
                  Open Chat
                </Link>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    )}
  </div>
  )
}

export default Messaages
