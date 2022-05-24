import { styles } from "./styles";
import React, { useState } from "react";
import useAuth from "../../../Auth/useAuth";
import ChatContant from "./ChatContant";
import { ViewProvidor } from "./ChatUseContext";
import useView from "./ChatUseContext";

const ChatEngine = () => {
  const { auth } = useAuth();
  const { showContacts, closeWindow } = useView();
  const [contantWindow, setContantWindow] = useState(false);
  const [hovered, setHovered] = useState(false);

    const handleClick = () => {
      const chatWith = {
        username: "",
        uuid: "",
        adID: "",
      };
      if(contantWindow) {
        closeWindow(chatWith);
        setContantWindow(false);
      }
      else{
            showContacts(chatWith);
            setContantWindow(true);
        }
    };

  return (
    // if we login show chat, else dont show
    auth.accessToken ? (
      <div
        onClick={handleClick}
        className="transition-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "4px solid #f9f0ff" : "1px solid #f9f0ff" },
        }}
      >
        <div onMouseEnter={() => setHovered(false)}>
          <ChatContant />
        </div>
      </div>
    ) : (
      <></>
    )
  );
};

export default ChatEngine;
