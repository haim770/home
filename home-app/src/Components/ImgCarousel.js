import React, { useState } from "react";
import "../styles/ImgCarousel.css";
import ImageComponent from "./ImageComponent.js";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function ImgCarousel(props) {
  const [currImg, setCurrImg] = useState(0);
  const images = "";
  return (
    <section className="carousel">
      <div className="center">
        <h1>{props.images[currImg].alt}</h1>
      </div>
      <ImageComponent
        src={props.images[currImg].picture_url}
        alt={props.images[currImg].alt}
      />
      <nav className="navArrows">
        <div
          className="left"
          onClick={(e) => {
            e.preventDefault();
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
        <div
          className="right"
          onClick={(e) => {
            e.preventDefault();
            currImg < props.images.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
      </nav>
    </section>
  );
}
ImgCarousel.defaultProps = {
  src:"blank_home.png",
  alt:"mxmx",
  images: [{ picture_url: "blank_home.png", alt: "no pic" }],
};
export default ImgCarousel;