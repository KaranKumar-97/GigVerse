import React,{useRef,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TextField } from '@mui/material';
import useUserStore from '../Store/useUserStore';



const Message = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null); // Step 1: Ref for scrolling to bottom

  const currentUser = useUserStore((state) => state.currentUser);
  

  const { isPending, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/${id}`,{withCredentials:true}).then((res) => res.data
      ).catch((error) => {
        toast.error(error.message);
        throw error;
      }),
  });

  const {mutate} = useMutation({
    mutationFn: (message) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages`, message,{withCredentials:true});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = () => {
  mutate({
      conversationId: id,
      desc: messageInputRef.current.value
    });
    messageInputRef.current.value = "";
  };


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]); 


  return (
    <div className=" w-[90%] mx-auto">
    <div className="">
      <span className="breadcrumbs">
        <Link to="/messages">Messages</Link> {">"} {currentUser.fullname} {">"} Conversation
      </span>
      {isPending ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="w-[80%] mx-auto my-12 px-12 py-20 flex flex-col gap-5 h-[500px] overflow-y-auto border-4 rounded-xl p-4" 
        style={{
          scrollbarWidth: 'thin', /* For Firefox */
          scrollbarColor: 'darkgray transparent', /* For Firefox */
          '--webkit-scrollbar-width': '4px', /* For Webkit (Chrome, Safari, Edge) */
          '--webkit-scrollbar-track': 'transparent', /* For Webkit */
          '--webkit-scrollbar-thumb': 'darkgray', /* For Webkit */
        }}
        ref={messagesEndRef}
        >
        {data.map((m) => (
          <div className={`${m.userId === currentUser._id ? "" : "flex-row-reverse self-end"} flex gap-5 max-w-[600px] text-lg`} key={m._id}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className={`${m.userId === currentUser._id ? "bg-blue-400 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg" : "bg-[#f4f1f1] text-gray-500 rounded-tr-lg rounded-br-lg rounded-bl-lg"} max-w-[500px] p-5 font-light`}>
              {m.desc}
            </p>
          </div>
          ))}
        </div>
      )}
      <hr />
      <div className='flex gap-10 my-10 max-w-[60%] mx-auto items-center'>
        <TextField inputRef={messageInputRef} multiline fullWidth type="text" placeholder="write a message" label="Your message" />
        <button className="px-6 py-4 bg-blue-900 text-white rounded-lg"  onClick={handleSubmit} >Send</button>
      </div>
    </div>
  </div>
  )
}

export default Message
