import Favorite from "@mui/icons-material/Favorite";
import React from "react";
import ImgCarousel from "./ImgCarousel";
import ChangeUserRule from "./ChangeUserRule";
import AdById from "./AdById";
import AddParameterToAds from "./AddParameterToAds";

const Home = () => {
  return (
     <div>
    {/* //   <AddParameterToAds/> */}
      <AdById adId="0" user_id="2" />
    </div>
  );
};

export default Home;
