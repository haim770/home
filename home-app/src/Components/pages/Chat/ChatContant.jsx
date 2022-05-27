import React, { useState } from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";
import useAuth from "../../../Auth/useAuth";
import instance from "../../../api/AxiosInstance";
const ChatContant = () => {
  const { auth } = useAuth();
  const { contactView, startNewChat } = useView();

  const [hovered, setHovered] = useState(false);

    const getContacts = async () => {
    const result = await instance.request({
      data: {
        data_type: "testAuth",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
  }

    const handleClick = () => {
      /*
      const chatWith = {
        adBlock: [],
        username: "TEST",
        uuid: "",
        adID: "",
      };
      startNewChat(chatWith);
      */
      getContacts();
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
