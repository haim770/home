import React, { useState } from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";

const ChatWith = () => {
  const { chatView, showContacts, chatInfo } = useView();

  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const chatWith = {
      adBlock: [],
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
      {`${chatInfo.username}`}
    </div>
  ) : (
    <div></div>
  );
};

export default ChatWith;
