import React, { useReducer, createContext, useContext } from "react";
import PopupAdReducer, { initialState } from "./PopupAdsReducer";

const PopupAdContext = createContext(initialState);

export const PopupAdProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(PopupAdReducer, initialState);

  // Show popup ad
  const popAd = (adId, userId) => {
    const updateAdID = adId;
    dispatch({
      type: "OPEN_POPUP",
      payload: {
        modalOpen: true,
        openModalAdId: updateAdID,
        openModalUserId: userId,
      },
    });
  };

  // Close popup ad
  const closePopAd = () => {
    dispatch({
      type: "CLOSE_POPUP",
      payload: {
        modalOpen: false,
        openModalAdId: "",
        openModalUserId: "",
      },
    });
  };

  // the values we want to make global
  const value = {
    modalOpen: state.modalOpen,
    openModalAdId: state.openModalAdId,
    openModalUserId: state.openModalUserId,
    closePopAd,
    popAd,
  };
  return <PopupAdContext.Provider value={value}>{children}</PopupAdContext.Provider>
  ;
};

const usePopupAd = () => {
  const context = useContext(PopupAdContext);
  if (context === undefined) {
    throw new Error(`usePopupAdContext must be used within PopupAdContext`);
  }
  return context;
};
export default usePopupAd;
