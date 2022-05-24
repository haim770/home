import React, { useState } from "react";
import { styles } from "./styles";

const ChatContant = (props) => {
  const [hovered, setHovered] = useState(false);
  return props.visible ? (
    <div
      className="transition-5"
      style={{
        ...styles.chatBoxWindowWrapper,
      }}
    >
      <div
        className="transition-3"
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
    </div>
  ) : (
    <></>
  );
};

export default ChatContant;
