import React from "react";
import usePopupAd from "../useContextReducer/PopupAdsContext";
import "./Styles/PopupModal.css";

function PopupModal() {
    const { modalOpen, openModalAdId, popAd, closePopAd } = usePopupAd();
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closePopAd();
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
          <p>{openModalAdId}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
               closePopAd();
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
