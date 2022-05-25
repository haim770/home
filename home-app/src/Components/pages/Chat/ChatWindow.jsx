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