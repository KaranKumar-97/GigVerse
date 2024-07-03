// import React from "react";
// import Slider from "infinite-react-carousel";

// const Slide = ({children,slidesToShow =1,arrowsScroll=1}) => {
//   return (
//     <div className="my-10">
//       <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} className="w-[90%] mx-auto">
//         {children}
//       </Slider>
//     </div>
//   );
// };

// export default Slide;

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const Slide = ({ children, slidesToShow }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        cssMode={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        loop={true}
        slidesPerView={slidesToShow}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {children.map((child, index) => (
          <SwiperSlide  key={index}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
