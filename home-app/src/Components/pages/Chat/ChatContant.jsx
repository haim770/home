import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import useView from "./ChatUseContext";
import useAuth from "../../../Auth/useAuth";
import instance from "../../../api/AxiosInstance";
const ChatContant = () => {
  const { auth } = useAuth();
  const { contactView, startNewChat } = useView();

  const [hovered, setHovered] = useState(false);
  const [contacts, setContacts] = useState({});

  /**
   * Get contacts from server
   */
  const getContacts = async () => {
    const result = await instance.request({
      data: {
        data_type: "getContacts",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setContacts(result.data.message);
  };
/*
  // Interval to call getContacts every 1 second.
  const liveContactsRefresh = setInterval(() => {
          console.log("test");
    }, 1000);

  const stopLiveRefresh = () => {
    clearInterval(liveContactsRefresh);
  }
*/

  const handleClick = () => {
      const chatWith = {
        adBlock: [],
        username: "TEST",
        uuid: "",
        adID: "",
      };
      startNewChat(chatWith);
  };

  /**
   * This use effect will render only once when the component loaded, when we close the contacts it will 
   * end the interval.
   * Will refesh contacts every 1 second.
   */
  useEffect(() => {
    if(contactView){
      const Interval = setInterval(() => {
        console.log("test");
      }, 1000);
      return () => clearInterval(Interval);
      }
  }, [contactView]);

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
  ) : (
    <></>
  );
};

export default ChatContant;
