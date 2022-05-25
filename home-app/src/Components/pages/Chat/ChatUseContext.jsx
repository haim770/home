import React, { useReducer, createContext, useContext } from "react";
import viewReducer, { initialState } from "./chatReducer";

const ViewContext = createContext(initialState);

export const ViewProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(viewReducer, initialState);

  // Starting new chat
  const startNewChat = (chatWith) => {
    //const updateChatInfo = state.chatInfo.concat(chatWith);
    const updateChatInfo = chatWith;
    dispatch({
      type: "START_NEW_CHAT",
      payload: {
        chatInfo: updateChatInfo,
        contactView: false,
        chatView: true,
        chatWindow: true,
      },
    });
  };

  // Open user contacts list
  const showContacts = (chatWith) => {
    const updateChatInfo = chatWith;
    dispatch({
      type: "SHOW_CONTACTS",
      payload: {
        chatInfo: updateChatInfo,
        contactView: true,
        chatView: false,
        chatWindow: true,
      },
    });
  };

  // Open user contacts list
  const closeWindow = (chatWith) => {
    const updateChatInfo = chatWith;
    dispatch({
      type: "CLOSE_WINDOW",
      payload: {
        chatInfo: updateChatInfo,
        contactView: false,
        chatView: false,
        chatWindow: false,
      },
    });
  };
  // the values we want to make global
  const value = {
    chatView: state.chatView,
    contactView: state.contactView,
    chatInfo: state.chatInfo,
    chatWindow: state.chatWindow,
    startNewChat,
    showContacts,
    closeWindow,
  };
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

const useView = () => {
    const context = useContext(ViewContext);
    if(context === undefined){
        throw new Error(`useView must be used within ViewContext`);
    }
    return context;
}
export default useView;
