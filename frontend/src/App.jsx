import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Gigs from "./Pages/Gigs";
import Gig from "./Pages/Gig";
import Mygigs from "./Pages/Mygigs";
import Orders from "./Pages/Orders";
import Addgigs from "./Pages/Addgigs";
import Messages from "./Pages/Messages";
import Message from "./Pages/Message";
import Login from "./Pages/Login";
import Register from "./Pages/Register";


import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import useUserStore from "./Store/useUserStore";
import axios from "axios";
import Cookies from 'js-cookie';
import Loader from "./Components/Loader";

function App() {
  const login=useUserStore((state)=>state.login);
  const userLoaded = useUserStore((state) => state.userLoaded);

  useEffect(()=>{
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/fetchuser`, {withCredentials: true})
      .then((res) => res.data).then((user) => {
        login(user)
        useUserStore.setState({ userLoaded: true })
      }).catch((error) => {
        console.log(error);
        useUserStore.setState({ userLoaded: true });
      });
    }
    else{
      useUserStore.setState({ userLoaded: true });
    }
  },[login])


  
  if (!userLoaded) {
    return <div className="w-full h-[100vh] flex justify-center items-center">
      <Loader />
    </div>; // Loading screen
  }


  const queryClient = new QueryClient()
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className="font-montserrat">
        <Navbar />

        <div className="pt-[5rem]">
          <Outlet />
          <Footer />
        </div>
      </div>
      </QueryClientProvider>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/mygigs", element: <Mygigs /> },
        { path: "/addgigs", element: <Addgigs /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register />}

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
