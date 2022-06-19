import React, { useEffect, useState } from "react";
import Button from "./Button";
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import RecipeReviewCard from "./RecipeReviewCard";
function AdFullForProps(props) {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  useEffect(() => {
    const result = instance.request({
      data: {
        data_type: "updateWatch",
        params: { adID: props.adBlock.ad.adID }, //window.location.href gets the urlline
      },
    });
  }, []);
  const changeToListView = (e) => {
    e.preventDefault();
    props.setListShow("showList");
    props.setFullShow("notShowFull");
    props.setAdFull({});
  };
  return (
    <section className={"ad"}>
      <button onClick={changeToListView}>x</button>
      <RecipeReviewCard
        adBlock={props.adBlock}
        maxSize="800"
        isFavorite={isFavorite}
        setFavorite={setIsFavorite}
      />
      <p>
        <Button content="contact seller" onclick={props.onclick} />
      </p>
    </section>
  );
}
AdFullForProps.defaultProps = {
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default AdFullForProps;
