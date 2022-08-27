import React from "react";
import usePopupAd from "../useContextReducer/PopupAdsContext";
import "./Styles/PopupModal.css";
import AdById from "../../../../AdById";
function PopupModal() {
    const { modalOpen, openModalAdId, popAd, closePopAd, openModalUserId } =
      usePopupAd();
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            className="button-4"
            onClick={() => {
              closePopAd();
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>האם ברצונך לאשר את המודעה?</h1>
        </div>
        <div className="body">
          <AdById adID={openModalAdId} user_id={openModalUserId} />
        </div>
        <div className="footer">
          <button
            className="button-4"
            onClick={() => {
              closePopAd();
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button className="button-4">Continue</button>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
