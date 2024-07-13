import React, { useState, useEffect } from "react";
import Featured from "../Components/Featured.jsx";
import Slide from "../Components/Slide.jsx";
import { cards, projects } from "../Data.jsx";
import Catcard from "../Components/Catcard.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import axios from "axios";
import GigCard from "../Components/GigCard.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //   });
  // }, []);
  const [sliderSettings, setSliderSettings] = useState({
    slidesToShow: 5,
    arrowsScroll: 3,
  });

  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      if (width < 750) {
        // Example for medium screens
        setSliderSettings({ slidesToShow: 1, arrowsScroll: 2 });
      } else if (width >= 750 && width < 1024) {
        // Example for medium screens
        setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
      } else if (width >= 1024 && width < 1250) {
        // Example for medium screens
        setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
      } else {
        // Default settings for large screens
        setSliderSettings({ slidesToShow: 4, arrowsScroll: 3 });
      }
    };

    const timeoutId = setTimeout(updateSliderSettings, 50);

    updateSliderSettings(); // Update on initial render
    window.addEventListener("resize", updateSliderSettings); // Update on window resize

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSliderSettings);
      clearTimeout(timeoutId);
    };
  }, []);

  const categories = [
    {
      title:"All",
      img:"/category/all.png"
    },
    {
      title: "Graphics & Design",
      img: "/category/design.png",
    },
    {
      title: "Programming & Tech",
      img: "/category/coding.png",
    },
    {
      title: "AI Services",
      img: "/category/ai.png",
    },
    {
      title: "Video & Animation",
      img: "/category/video.png",
    },
    {
      title: "Writing & Translation",
      img: "/category/translate.png",
    },
    {
      title: "Digital Marketing",
      img: "/category/social.png",
    },
    {
      title: "Music & Audio",
      img: "/category/music.png",
    },
  ]

  const [topgigs, setTopgigs] = useState([])


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/gigs/topgigs`).then((res) => setTopgigs(res.data)).catch((err) => console.log(err))

  },[])

  return (
    <div>
      <Featured />
      <div className="w-[90%] mx-auto">
          <h1 className="font-bold text-2xl my-10 text-blue-900">
            Explore Categories
          </h1>
        <div className="flex justify-center gap-10 flex-wrap md:w-[80%] mx-auto">
          {categories.map((category,i) => (
             <Link to={`/gigs?category=${category.title === "All" ? "" : category.title}`} key={i} className="w-32 h-36 md:w-48 md:h-44 flex flex-col gap-3 justify-center items-center border rounded-xl p-4 bg-gray-100 shadow-xl hover:bg-white transform hover:scale-[102%] transition-all duration-300 ease-in-out">
             <img
               src={category.img}
               alt=""
               className="w-14 md:w-20 mb-2 transition-transform duration-300 ease-in-out hover:scale-[105%]"
             />
             <p className="font-semibold text-center text-sm md:text-base ">
             {category.title}
             </p>
           </Link>

          ))}

        </div>
      </div>
      <h1 className="font-bold text-2xl text-gray-700 w-[90%] mx-auto mt-8 md:my-8">
          Popular services
        </h1>
        <div className="md:w-[90%] mx-auto">

        <Slide {...sliderSettings}>
          {topgigs.map((card,i) => {
            return (
              <div className="scale-[89%] -mt-16">

            <GigCard key={i} item={card} className="scale-75" />
              </div>
          )
          })}
        </Slide>
          </div>

    </div>
  );
};

export default Home;
