import React, { useState } from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";

const ChatContant = () => {
  const { contactView, startNewChat } = useView();

  const [hovered, setHovered] = useState(false);


    const handleClick = () => {
      const chatWith = {
        username: "TEST",
        uuid: "",
        adID: "",
      };
      startNewChat(chatWith);
    };

  return contactView ? (
      <div
        className="transition-3"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatBoxWindowContant,
          ...{
            backgroundColor: hovered ? "#E0E0E0" : "#ffffff",
          },
        }}
      >
        ChatContant
      </div>
  ) : (    <>
    </> )
};

export default ChatContant;
