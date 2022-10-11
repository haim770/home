import React from "react";
import { styles } from "./styles";
import "./styles.css";
import useView from "./ChatUseContext";
import ChatContant from "./ChatContant";
import ChatWith from "./ChatWith";

const ChatWindow = () => {
  const { contactView, chatView, chatWindow } = useView();

  return chatWindow ? (
    <div
      className="transition-5"
      style={{
        ...styles.chatBoxWindowWrapper,
      }}
    >
      {contactView ? (
        <div style={{ height: "100%", overflow: "scroll" }}>
          <ChatContant />
        </div>
      ) : (
        <div style={{ height: "100%" }}>{chatView ? <ChatWith /> : <></>}</div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ChatWindow;
