import React, { useEffect, useState, useRef } from "react";
import GigCard from "../Components/GigCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../Components/Loader.jsx";
import { useLocation,useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
  }, [sortby, location.search]);

  const navigate = useNavigate();

  const categories = [
    "All",
    "Graphics & Design",
    "Programming & Tech",
    "Digital Marketing",
    "Video & Animation",
    "Writing & Translation",
    "Music & Audio",
    "Business",
    "Consulting",
    "AI Services",
    "Personal Growth",
  ];
  const [categoryValue, setCategoryValue] = useState(location.search.split("=")[1] ? `${decodeURIComponent(location.search.split("=")[1])}` : "All");

  const handleCategory= (value)=>  {
    setCategoryValue(value);

    if(value==="All") navigate(`/gigs?category?`);
    else navigate(`/gigs?category=${value}`);
  }

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
      <div className="md:mt-10 mb-8 space-y-3">
        <p className="flex gap-2">
          <img src="/images/home.svg" alt="" /> {"/  "}GigVerse {">"} {location.search.split("=")[1] ? 
          `${decodeURIComponent(location.search.split("=")[1])}`
           : "All"}
        </p>

        <h1 className="font-bold text-2xl uppercase">{location.search.split("=")[1] ? `${decodeURIComponent(location.search.split("=")[1])}` : "All"}</h1>
        {/* <p>
          Paint a picture for your audience with digital & hand-drawn
          illustrations.
        </p> */}
      </div>

      <p className="font-bold text-xl text-blue-800 my-2 pl-4">Apply Filters</p>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-3 py-2 bg-gray-100 border rounded-xl">
      <div className="w-[80%] lg:w-[20%] mt-3 lg:mt-0">
      <Autocomplete
            
            size="small"
            label="Switch Category"
            options={categories}
            value={categoryValue}
            onChange={(e, value) => handleCategory(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Change Category"
                name="category"
                placeholder="Search for a Category"
                className="bg-white"

              />
            )}
          />
      </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <p className="font-semibold">Price :</p>
          <div className="flex gap-3">

          <input
            type="number"
            placeholder="min"
            ref={minRef}
            // value={minRef.current?.value}
            className="border border-gray-300 rounded-md px-2 py-1 w-[100px]"
            />
          <input
            type="number"
            placeholder="max"
            ref={maxRef}
            // value={maxRef.current?.value}
            className="border border-gray-300 rounded-md px-2 py-1 w-[100px]"
            />
          <button className="px-4 py-1 bg-blue-900 text-white rounded-lg" onClick={()=> refetch()}>
            Apply
          </button>
            </div>
        </div>

        <div className="border w-[80%] lg:w-[15%]">
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortby}
              label="Sort By"
              onChange={(e)=>{setSortby(e.target.value);}}
              fullWidth
              size="small"
              className="bg-white"
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

      {isPending ? "" : error ? "" : data.length==0 ? (
        <div className="w-full h-[50vh] flex flex-col gap-6 justify-center items-center">
          <p className="text-blue-900 text-4xl font-bold">No Gigs in this Category / Filter</p>
     
      
        </div>
      
      ) :  (
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
