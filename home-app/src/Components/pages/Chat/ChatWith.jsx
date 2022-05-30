import React, { useState , useRef, useEffect} from "react";
import { styles } from "./styles";
import "./styles.css";
import BackImg from "../../../pics/chat/back-arrow.png";
import useView from "./ChatUseContext";

const ChatWith = () => {
  const { chatView, showContacts, chatInfo, closeWindow } = useView();
  const divRef = useRef();

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
        {/* Body */}
        <div className="chatWindowBody" ref={divRef}>
          {`${chatInfo.username}`}
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
          <p>Some test Text</p>
        </div>
        {/* Footer */}
        <div className="chatWindowFooter">
          <div class="left_pannel send_message_box" id="send_message_box">
            <input
              type="text"
              id="text_box"
              onkeyup="enter_pressed(event)"
              placeholder="רשום את ההודעה שלך"
            />
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
};;

export default ChatWith;
