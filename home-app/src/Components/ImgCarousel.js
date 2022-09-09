import React, { useState } from "react";
import "../styles/ImgCarousel.css";
import ImageComponent from "./ImageComponent.js";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function ImgCarousel(props) {
  //carousel for the ads revolve
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
          title="קודם"
          onClick={(e) => {
            e.preventDefault();
            //endless spinner
            currImg > 0
              ? setCurrImg(currImg - 1)
              : setCurrImg(props.images.length - 1);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
        <div
          className="right"
          title="הבא"
          onClick={(e) => {
            //endless spinner
            e.preventDefault();
            currImg < props.images.length - 1
              ? setCurrImg(currImg + 1)
              : setCurrImg(0);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
      </nav>
    </section>
  );
}
ImgCarousel.defaultProps = {
  src: "blank_home.png",
  alt: "mxmx",
  images: [{ picture_url: "blank_home.png", alt: "no pic" }],
};
export default ImgCarousel;
