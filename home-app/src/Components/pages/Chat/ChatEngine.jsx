import React from 'react'
import { styles } from "./styles";

import useAuth from "../../../Auth/useAuth";

const ChatEngine = () => {
      const { auth } = useAuth();
  return (
      // if we login show chat, else dont show
      auth.accessToken?
    <div
      className="transition-5"
      style={{
        ...styles.chatWithMeButton,
      }}
    ></div>:<></>
  );
}

export default ChatEngine