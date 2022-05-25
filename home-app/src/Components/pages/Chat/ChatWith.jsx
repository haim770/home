import React, { useState } from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";

const ChatWith = () => {
  const { chatView, showContacts } = useView();

  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const chatWith = {
      username: "",
      uuid: "",
      adID: "",
    };
    showContacts(chatWith);
  };

  return chatView ? (
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
      chatView
    </div>
  ) : (
    <div></div>
  );
};

export default ChatWith;
