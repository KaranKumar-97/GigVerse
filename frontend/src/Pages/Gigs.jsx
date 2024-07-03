import React, { useEffect, useState, useRef } from "react";
import GigCard from "../Components/GigCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../Components/Loader.jsx";
import { useLocation } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Gigs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const [sortby, setSortby] = useState("price");
  const minRef = useRef();
  const maxRef = useRef();

  const location = useLocation();

  const { isPending, error, data,refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/gigs${location.search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sortby}`)
        .then((res) => res.data)
        .catch((error) => {
          toast.error("Something went wrong!");
          throw error;
        }),
  });

 

  useEffect(() => {
    refetch();
  }, [sortby]);


  // useEffect(() => {
  //   // Example condition: Only log if data has more than 0 items
  //   if (data && data.length > 0) {
  //     console.log("Data updated:", data);
  //   }
  //   if (error) {
  //     console.log("Error updated:", error);
  //   }
  // }, [data, error]);

//   if (error) {
//     toast.error(error.message);
//     return "An error has occurred: " + error.message;
// }

  return (
    <div className="w-[90%] mx-auto">
      <div className="mt-10 mb-8 space-y-3">
        <p className="flex gap-2">
          <img src="/images/home.svg" alt="" /> {"/  "}GigVerse {">"} {location.search.split("=")[1] ? `${location.search.split("=")[1]}` : "All"}
        </p>

        <h1 className="font-bold text-2xl uppercase">{location.search.split("=")[1] ? `${location.search.split("=")[1]}` : "All"}</h1>
        <p>
          Paint a picture for your audience with digital & hand-drawn
          illustrations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between my-5">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <p className="font-semibold">Budget</p>
          <input
            type="number"
            placeholder="min"
            ref={minRef}
            // value={minRef.current?.value}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <input
            type="number"
            placeholder="max"
            ref={maxRef}
            // value={maxRef.current?.value}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <button className="px-4 py-1 bg-blue-900 text-white rounded-lg" onClick={()=> refetch()}>
            Apply
          </button>
        </div>

        <div className="text-center">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortby}
              label="Sort By"
              onChange={(e)=>{setSortby(e.target.value);}}
              size="small"
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="sales">Best Selling</MenuItem>
              <MenuItem value="createdAt">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {isPending && <Loader />}
      {error && (
       <div className="w-full h-[50vh] flex flex-col gap-6 justify-center items-center">
       <p className="text-blue-900 text-4xl font-bold">Oops! Soemthing Went Wrong</p>
       <p className="text-red-600 text-4xl font-bold">{error.message}</p>
       <button className="px-6 py-4 bg-blue-900 text-white rounded-lg" onClick={()=>navigate("/")}>Take me to Home Page</button>
     </div>
      )}

      {isPending ? "" : error ? "" : (
        <div className="flex justify-center flex-wrap">
          {data.map((gig) => (
            <GigCard item={gig} key={gig._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gigs;
