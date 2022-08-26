import React, { useState } from "react";
import "../styles/ImgCarousel.css";
import ImageComponent from "./ImageComponent.js";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function ImgCaruaselForEditAd(props) {
  const [currImg, setCurrImg] = useState(0);
  const [startPointOfCarusell, setStartPointOfCarusell] = useState(0);
  const [picToDisplay, setPicToDisplay] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(props);
  console.log(props.images[0]);
  console.log(typeof props.images);
  const deletePic = (e) => {
    e.preventDefault();
    if (props.images.length == 1) {
      props.picsForDelete.push(props.images[currImg]);
      props.setDisplayImgCarusell(false);
      setRefresh(!refresh);
    } else {
      //bring the last pic to our place and delete it from the last place of array(we know not empty one)
      props.picsForDelete.push(props.images[currImg]);
      props.images[currImg] = props.images[props.images.length - 1];
      if (currImg > 0) {
        setCurrImg(currImg - 1);
      }
      props.images.pop();
      setRefresh(!refresh);
    }
  };
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
            currImg > startPointOfCarusell && setCurrImg(currImg - 1);
            console.log(currImg);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
        <div
          className="right"
          onClick={(e) => {
            e.preventDefault();
            currImg < props.images.length - 1 && setCurrImg(currImg + 1);
            console.log(currImg);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
      </nav>
      <button onClick={deletePic} className="button-4">
        מחק תמונה
      </button>
    </section>
  );
}
ImgCaruaselForEditAd.defaultProps = {
  src: "blank_home.png",
  alt: "mxmx",
  images: [{ picture_url: "blank_home.png", alt: "no pic" }],
};
export default ImgCaruaselForEditAd;
