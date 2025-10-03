import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../assets/one.jpg";
import slide2 from "../assets/two.jpg";
import slide3 from "../assets/three.jpg";

const HeroCarousel = () => {
  const images = [slide1, slide2, slide3];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-4">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i} className="h-[80vh]">
            <img
              src={img}
              alt={`Slide ${i + 1}`}
            className="w-full h-auto object-cover rounded-xl mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
