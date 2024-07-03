import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader'

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`,{withCredentials:true})
    .then((res) => res.data)
    .catch((error) => {
      toast.error(`Something went wrong : ${error.message}`);
      console.log(error.message);
      throw error;
    }),
  })

  const handleContact = async (order) => { 
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId+buyerId;

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/conversations/single/${id}`,{withCredentials:true});
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        },{withCredentials:true});
        navigate(`/message/${res.data.id}`);
      }
    }
  }

  // useEffect(() => {
  //   console.log(data)
  // },[data])

  return (
    <div className="">
      {isPending && <Loader />}
      {error && <div>{error.message}</div>}

      {!isPending && !error &&
         (
        <div className="w-[90%] mx-auto">
          <div className="font-bold text-4xl my-10 text-blue-900">
            <h1>My Orders</h1>
          </div>

          {data.length===0 &&(
            <div className='font-bold text-3xl flex justify-center items-center h-[40vh] text-red-700'>
              You don't have any orders yet !

            </div>
          )}

          {data.length>0 &&(

          <table className='w-[90%] mx-auto'>
            <tr className='bg-blue-900 text-white text-lg rounded-xl'>
              <th className='py-3'>Image</th>
              <th className=''>Title</th>
              <th className=''>Price</th>
              <th className=''>Contact</th>
            </tr>

            {data.map((order) => (
              <tr key={order._id} className='border-b-2 '>
                <td className='flex justify-center'>
                  <img className="w-36 h-36 rounded-md object-contain" src={order.img} alt="" />
                </td>
                <td className='  text-center'>{order.title}</td>
                <td className=' text-center'>{order.price}</td>
                <td className=''>
                  <img
                    className="w-12 flex m-auto cursor-pointer"
                    src="/images/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                    />
                </td>
              </tr>
            ))}
          </table>
          )}
        </div>
      )}
      
    </div>
  )
}

export default Orders
