import React, { useState , useRef, useEffect} from "react";
import { styles } from "./styles";
import "./styles.css";
import BackImg from "../../../pics/chat/back-arrow.png";
import useView from "./ChatUseContext";
import useAuth from "../../../Auth/useAuth";
import instance from "../../../api/AxiosInstance";
import MessageBlock from "./Messages/MessageBlock";

const ChatWith = () => {
  const { chatView, showContacts, chatInfo, closeWindow } = useView();
  const [chatContact, setChatContact] = useState([]);
  const [showNewMessages, setShowNewMessages] = useState("getChat");
  const divRef = useRef();
  const { auth } = useAuth();

  /**
   * Get Chat from server
   */
  const getChat = async () => {
    const result = await instance.request({
      data: {
        data_type: showNewMessages,
        params: { "chatWith": chatInfo.uuid },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
      /**
       * After we load all user message we want to show only new messages.
       */
      setShowNewMessages("refreshData");

      // check if we got new data from server or any response
      if (result?.data) {
          setChatContact([
            ...chatContact,
            Object.values(result.data.chatMessages).map(
              (anObjectMapped, index) => {
                 return {
                   key: anObjectMapped["msgid"],
                   msgData: anObjectMapped,
                 };
              }
            ),
          ]);
          console.log(result.data.chatMessages);
        }
        /**
         * Add messages styling
         */

  };

  /**
   * This use effect will render only once when the component loaded,
   * when we close the contacts it will end the interval.
   * Will refesh contacts every 1 second.
   */
  useEffect(() => {
    if (chatContact) {
      const Interval = setInterval(() => {
        getChat();
      }, 1000);
      return () => clearInterval(Interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatContact]);


  /**
   * Handle go back to contacts button
   */
  const handleClickBack = () => {
    const chatWith = {
      adBlock: [],
      username: "",
      uuid: "",
      adID: "",
    };
    showContacts(chatWith);
  };

  /**
   * Handle close button
   */
  const handleClickClose = () => {
    const chatWith = {
      adBlock: [],
      username: "",
      uuid: "",
      adID: "",
    };
    closeWindow(chatWith);
  };

  // this function will scroll down to button when we load our messages
  useEffect(() => {
    if (divRef.current) divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [divRef]);

  return chatView ? (
    <div
      className="transition-3"
      style={{
        ...styles.chatBoxWindowContant,
        ...{ height: "100%", alignItems: "inherit" },
      }}
    >
      <div className="chatWrapper">
        {/* Header */}
        <div className="chatWindowHeader">
          <div className="backButton" onClick={handleClickBack}>
            <img src={BackImg} alt="BackImg" />
          </div>
          <div className="userInfo">
            <div>{`${chatInfo.username}`}</div>
            <div>{`${chatInfo.uuid}`}</div>
          </div>
          <div className="closeButton" onClick={handleClickClose}>
            X
          </div>
        </div>
        {/* Body, ref will use to scroll down to the last message */}
        <div className="chatWindowBody" ref={divRef}>
          {chatContact.map((msg) => (
            <>
              {msg.map((message) => (
                <><MessageBlock props={message["msgData"]}/></>
              ))}
            </>
          ))}
        </div>
        {/* Footer */}
        <div className="chatWindowFooter">
          <div class="left_pannel send_message_box" id="send_message_box">
            <input type="text" id="text_box" placeholder="רשום את ההודעה שלך" />
            <input
              type="button"
              value="שלח"
              id="send_btn"
              onclick="send_message(event)"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ChatWith;
