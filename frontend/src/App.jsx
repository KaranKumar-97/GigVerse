import { useState } from "react";
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

function App() {
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
