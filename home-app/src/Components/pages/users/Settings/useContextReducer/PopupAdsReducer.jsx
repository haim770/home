// initial the view states
export const initialState = {
  modalOpen: false,
  openModalAdId: "629e3ba00dd5a",
};

const PopupAdReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "OPEN_POPUP":
      return {
        ...state,
        modalOpen: payload.modalOpen,
        openModalAdId: payload.openModalAdId,
      };

    case "CLOSE_POPUP":
      return {
        ...state,
        modalOpen: payload.modalOpen,
        openModalAdId: payload.openModalAdId,
      };

    default:
      // only for the dev
      throw new Error(`No case for type ${type} in popup reducer`);
  }
};

export default PopupAdReducer;
