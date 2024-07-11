import React from "react";
import TextField from '@mui/material/TextField';
// import { gigReducer, INITIAL_STATE } from "../Reducers/GigReducer.jsx";

const Addgigs = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <h1 className="font-bold text-4xl my-10 text-blue-900">Add New Gig</h1>

      <div className="w-[45%]">
        <TextField fullWidth id="" label="Gig Title" variant="outlined" placeholder="i.e I will do something i am really good at" />

      </div>
    </div>
  )
};

export default Addgigs;
