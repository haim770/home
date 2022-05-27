import React, { useReducer, createContext, useContext } from "react";
import packReducer, { initialState } from "./packReducer";

const PackContext = createContext(initialState);

export const PackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packReducer, initialState);

  // Add new pack to our list
  const addToPacks = (packData) => {
    const updatePackProvider = state.packgeInfo.concat(packData);
    dispatch({
      type: "ADD_TO_PACKS",
      payload: {
        packgeInfo: updatePackProvider,
      },
    });
  };

  // Clear our packs data
  const clearData = () => {
    dispatch({
      type: "CLEAR_PACKS_LIST",
      payload: {},
    });
  };

  const value = {
    addToPacks,
    clearData,
    packgeInfo: state.packgeInfo,
  };

  return <PackContext.Provider value={value}>{children}</PackContext.Provider>;
};

const usePack = () => {
  const context = useContext(PackContext);
  if (context === undefined) {
    throw new Error(`PackProvider must be used within PackkContext`);
  }
  return context;
};

export default usePack;
