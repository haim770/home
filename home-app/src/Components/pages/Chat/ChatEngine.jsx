import { styles } from "./styles";
import "./styles.css";
import React, { useState } from "react";
import useAuth from "../../../Auth/useAuth";
import useView from "./ChatUseContext";
import ChatWindow from "./ChatWindow";


const ChatEngine = () => {
  const { auth } = useAuth();
  const { showContacts, closeWindow, chatWindow } = useView();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const chatWith = {
      adBlock: [],
      username: "",
      uuid: "",
      adID: "",
    };
    // if some view is open, then close it on next click otherwise open chat contacts
    if (chatWindow) {
      closeWindow(chatWith);
    } else {
      showContacts(chatWith);
    }
  };

    return (
      // if we login show chat, else dont show
      auth.accessToken ? (
        <div>
          <div
            className="transition-5"
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              ...styles.chatWithMeButton,
              ...{
                border: hovered ? "4px solid #f9f0ff" : "1px solid #f9f0ff",
              },
            }}
          ></div>
          <ChatWindow />
        </div>
      ) : (
        <></>
      )
    );
};

export default ChatEngine;
