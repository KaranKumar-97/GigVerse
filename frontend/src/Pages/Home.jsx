import React,{useState,useEffect} from "react";
import Featured from "../Components/Featured.jsx";
import Slide from "../Components/Slide.jsx";
import { cards, projects } from "../Data.jsx";
import Catcard from "../Components/Catcard.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  const [sliderSettings, setSliderSettings] = useState({
    slidesToShow: 5,
    arrowsScroll: 3,
  });

  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      if (width < 640) { // Example for small screens
        setSliderSettings({ slidesToShow: 1, arrowsScroll: 1 });
      } else if (width >= 640 && width < 750) { // Example for medium screens
        setSliderSettings({ slidesToShow: 2, arrowsScroll: 2 });
      } else if (width >= 750 && width < 1024) { // Example for medium screens
        setSliderSettings({ slidesToShow: 3, arrowsScroll: 2 });
      } else if (width >= 1024 && width < 1250) { // Example for medium screens
        setSliderSettings({ slidesToShow: 4, arrowsScroll: 2 });
      } else { // Default settings for large screens
        setSliderSettings({ slidesToShow: 5, arrowsScroll: 3 });
      }
    };

    const timeoutId = setTimeout(updateSliderSettings, 50);

    updateSliderSettings(); // Update on initial render
    window.addEventListener('resize', updateSliderSettings); // Update on window resize

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSliderSettings);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Featured />
      <div className="w-[90%] mx-auto ">
      <h1 className="font-bold text-2xl text-gray-700 my-10">
        Popular services
      </h1>
      <Slide {...sliderSettings}>
        {cards.map((card) => {
          return <Catcard item={card} key={card.id} className="border" />;
        })}
      </Slide>
        
        </div>

        <div className="w-[90%] mx-auto ">


      <h1 className="font-bold text-2xl text-gray-700 my-10">
        Inspiring work made on GigVerse
      </h1>

      <div className="my-10">
        <Slide slidesToShow={sliderSettings.slidesToShow-1}>
          {projects.map((project) => {
            return (
              <ProjectCard item={project} key={project.id} className="border" />
            );
          })}
        </Slide>
          </div>
      </div>
    </div>
  );
};

export default Home;
