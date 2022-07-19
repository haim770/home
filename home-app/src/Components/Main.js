import Favorite from "@mui/icons-material/Favorite";
import { React, useState } from "react";
import ImgCarousel from "./ImgCarousel";
import ChangeUserRule from "./ChangeUserRule";
import AddParameterToAds from "./AddParameterToAds";
import FavoritesAds from "./FavoritesAds";

const Home = () => {
  return (
    <div>
      <FavoritesAds/>
      {/* <ChangeUserRule /> */}
    </div>
  );
};

export default Home;
