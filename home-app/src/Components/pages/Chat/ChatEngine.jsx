import { styles } from "./styles";
import React, { useState } from "react";

import useAuth from "../../../Auth/useAuth";
import ChatContant from "./ChatContant";

const ChatEngine = () => {
  const { auth } = useAuth();
  const [contantWindow, setContantWindow] = useState(true);
  const [hovered, setHovered] = useState(false);
  return (
    // if we login show chat, else dont show
    auth.accessToken ? (
      <div
        className="transition-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "4px solid #f9f0ff" : "1px solid #f9f0ff" },
        }}
      >
        <div
          onMouseEnter={() => setHovered(false)}
        >
          <ChatContant visible={contantWindow === true} />
        </div>
      </div>
    ) : (
      <></>
    )
  );
};

export default ChatEngine;
