import React from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";
import ChatContant from "./ChatContant";
import ChatWith from "./ChatWith";
const ChatWindow = () => {
  const { contactView, chatView, chatWindow  } = useView();

  return chatWindow ? (
    <div
      className="transition-5"
      style={{
        ...styles.chatBoxWindowWrapper,
      }}
    >
      {contactView ? (
        <div>
          <ChatContant />
        </div>
      ) : (
        <div>{chatView ? <ChatWith /> : <></>}</div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ChatWindow;


/* 
    <div
      className="transition-5"
      style={{
        ...styles.chatBoxWindowWrapper,
      }}
    >
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
    </div>
*/