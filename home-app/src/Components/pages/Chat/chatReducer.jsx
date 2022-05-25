// initial the view states
export const initialState = {
  contactView: false,
  chatView: false,
  chatWindow: false,
  /**
   * chatInfo will contain:
   *    - username we chat with
   *    - username uuid we chat with
   *    - username Ad id
   */
  chatInfo: [],
};


const viewReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "START_NEW_CHAT":
      console.log("START_NEW_CHAT", payload);
      return {
        ...state,
        contactView: payload.contactView,
        chatView: payload.chatView,
        chatInfo: payload.chatInfo,
        chatWindow: payload.chatWindow,
      };

    case "SHOW_CONTACTS":
      console.log("SHOW_CONTACTS", payload);
      return {
        ...state,
        contactView: payload.contactView,
        chatView: payload.chatView,
        chatInfo: payload.chatInfo,
        chatWindow: payload.chatWindow,
      };

      case "CLOSE_WINDOW":
              console.log("CLOSE_WINDOW", payload);
      return {
        ...state,
        contactView: payload.contactView,
        chatView: payload.chatView,
        chatInfo: payload.chatInfo,
        chatWindow: payload.chatWindow,
      };

    default:
      // only for the dev
      throw new Error(`No case for type ${type} in chat reducer`);
  }
};

export default viewReducer;