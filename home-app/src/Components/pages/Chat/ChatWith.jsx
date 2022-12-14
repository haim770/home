import React, { useState, useRef, useEffect } from "react";
import { styles } from "./styles";
import "./styles.css";
import BackImg from "../../../pics/chat/back-arrow.png";
import useView from "./ChatUseContext";
import useAuth from "../../../Auth/useAuth";
import instance from "../../../api/AxiosInstance";
import MessageBlock from "./Messages/MessageBlock";
import { AiOutlineClose } from "react-icons/ai";
import useDH from "../../../Auth/DH/DHUseContext";
import { v4 as uuidv4 } from "uuid";

const ChatWith = () => {
  const { chatView, showContacts, chatInfo, closeWindow } = useView();
  const { encryptAES } = useDH();
  const [chatContact, setChatContact] = useState([]);
  const [showNewMessages, setShowNewMessages] = useState("getChat");
  const [loading, setLoading] = useState(true);
  const [lastSeen, setLastSeen] = useState("");
  const divRef = useRef();
  const inputRef = useRef();
  const [input, setInput] = useState(
    chatInfo?.adID ? " מספר המודעה הוא " + chatInfo.adID : ""
  );
  const { auth } = useAuth();

  /**
   * Get Chat from server
   */
  const getChat = async () => {
    const result = await instance.request({
      data: {
        data_type: showNewMessages,
        params: { chatWith: chatInfo.uuid },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    /**
     * After we load all user message we want to show only new messages.
     */

    // check if we got new data from server or any response
    if (result?.data) {
      if (result?.data?.chatMessages) {
        setChatContact([
          ...chatContact,
          Object.values(result.data.chatMessages).map(
            (anObjectMapped, index) => {
              return {
                key: uuidv4(),
                msgData: anObjectMapped,
              };
            }
          ),
        ]);
      }
    }

    if (showNewMessages === "refreshData")
      //console.log(result?.data);
      // after finish load all data stop loading
      setLoading(false);

    setShowNewMessages("refreshData");
  };

  /**
   * Get lest seen from server
   */
  const getLastSeenChat = async () => {
    const result = await instance.request({
      data: {
        data_type: "getLastSeenChat",
        params: { chatWith: chatInfo.uuid },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    if (result?.data) {
      if (result?.data?.last_seen) {
        setLastSeen(result?.data?.last_seen);
      }
    }
  };

  /**
   * Get Chat update from server
   */
  const getUpdateSeenChat = async () => {
    const result = await instance.request({
      data: {
        data_type: "getUpdateSeenChat",
        params: { chatWith: chatInfo.uuid },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    if (result?.data) {
      //console.log(result?.data);
      if (result?.data?.updates) {
        Object.values(result.data.updates).map((anObjectMapped, index) => {
          //console.log(anObjectMapped)
          toggleSeenStatus(anObjectMapped.msgid, anObjectMapped);
        });
      }
    }
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
        getLastSeenChat();
        getUpdateSeenChat();
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

  /**
   * Handle sumbit button and Enter key button
   */
  const handleBtnlistener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      //console.log("Enter key was pressed. Run your function.");
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (input.trim().length !== 0) {
      let encryptMessage = encryptAES(input);
      const result = await instance.request({
        data: {
          data_type: "submitMessage",
          params: {
            chatWith: chatInfo.uuid,
            message: encryptMessage,
            adId: input.includes("מספר המודעה הוא")
              ? chatInfo?.adID
                ? chatInfo.adID
                : ""
              : "",
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log("result");
      console.log(result);
      if (result?.data) {
        console.log(result);
        if (result?.data?.chatMessages) {
          setChatContact([
            ...chatContact,
            Object.values(result.data.chatMessages).map(
              (anObjectMapped, index) => {
                return {
                  key: uuidv4(),
                  msgData: anObjectMapped,
                };
              }
            ),
          ]);
        }
      }
    }
    // reset our input to empty string
    setInput("");
  };

  const toggleSeenStatus = (msgid, msgData) => {
    setChatContact(
      chatContact.map((item) =>
        item.map((message) =>
          message["msgData"].msgid === msgid
            ? {
                key: uuidv4(),
                msgData: msgData,
              }
            : {
                key: uuidv4(),
                msgData: message["msgData"],
              }
        )
      )
    );
  };

  // this function will scroll down to button when we load our messages
  useEffect(() => {
    if (divRef.current) divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [divRef]);
  // this function will scroll down to button when we load our messages
  useEffect(() => {
    //divRef.current?.scrollIntoView({ behavior: "smooth" });
    if (divRef.current) divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [chatContact]);

  const scrollToBottom = () => {
    divRef.current?.scrollTo(0, divRef.current.scrollHeight);
  };

  // scroll down when new messages comes
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return chatView ? (
    <div
      className="transition-3"
      style={{
        ...styles.chatBoxWindowContant,
        ...{ height: "100%", alignItems: "inherit" },
      }}
    >
      <div className="chatWrapper">
        {/* {console.log(chatInfo)} */}
        {/* Header */}
        <div className="chatWindowHeader">
          <div className="backButton" onClick={handleClickBack}>
            <img src={BackImg} alt="BackImg" />
          </div>
          <div className="userInfo">
            <div>{`${chatInfo.username}`}</div>
            <div>{lastSeen}</div>
          </div>
          <div className="closeButton" onClick={handleClickClose}>
            <AiOutlineClose />
          </div>
        </div>
        {/* Body, ref will use to scroll down to the last message */}
        <div className="chatWindowBody" ref={divRef}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            chatContact.map((msg) => (
              <>
                {msg.map((message) => (
                  <>
                    <MessageBlock props={message["msgData"]} />
                  </>
                ))}
              </>
            ))
          )}
          {scrollToBottom()}
        </div>
        {/* Footer */}
        <div className="chatWindowFooter">
          <div className="left_pannel send_message_box" id="send_message_box">
            <input
              type="text"
              id="text_box"
              ref={inputRef}
              autoComplete="off"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              aria-describedby="uidnote"
              placeholder="רשום את ההודעה שלך"
              onKeyPress={handleBtnlistener}
            />
            <button className="button-4" id="send_btn" onClick={handleSubmit}>
              שלח
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ChatWith;
