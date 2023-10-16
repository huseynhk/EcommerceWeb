import React from "react";
import sliderImg from "../img/clothes.jpg";
import sliderImg2 from "../img/shoe2.jpg";
import sliderImg3 from "../img/shoe3.jpg";
import sliderImg4 from "../img/jeans6.jpg";
import sliderImg5 from "../img/dress1.jpg";
import sliderImg6 from "../img/hoodie1.jpg";
import sliderImg7 from "../img/bag2.jpg";
import sliderImg8 from "../img/suit3.jpg";
import sliderImg9 from "../img/t-shirt1.jpg";
import sliderImg10 from "../img/jeans5.jpg";
import sliderImg11 from "../img/bag1.jpg";
import sliderImg12 from "../img/dress2.jpg";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Hero = () => {
  const images = [
    sliderImg,
    sliderImg2,
    sliderImg3,
    sliderImg4,
    sliderImg5,
    sliderImg6,
    sliderImg7,
    sliderImg8,
    sliderImg9,
    sliderImg10,
    sliderImg11,
    sliderImg12,
  ];
  const settings = {
    slidesToScroll: 3,
    slidesToShow: 3,
    indicators: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
      
    ],
  };

  return (
    <section className="-mb-8 ">
      <Slide {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-[85vh]">
            <img
              src={image}
              alt={`slider-${index}`}
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        ))}
      </Slide>
    </section>
  );
};

export default Hero;
