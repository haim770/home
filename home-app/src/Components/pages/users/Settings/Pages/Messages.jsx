import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
import { styles } from "./Styles/styles";
import "./Styles/messagesStyles.css";
import MessageBlock from "../../../Chat/Messages/MessageBlock";
import "../../../Chat/styles.css";
import useView from "../../../Chat/ChatUseContext";
import { v4 as uuidv4 } from "uuid";
import useDH from "../../../../../Auth/DH/DHUseContext";

const Messages = () => {
  //messages display
  const { auth } = useAuth();
  const { encryptAES } = useDH();

  const [hovered, setHovered] = useState(false);
  const [contacts, setContacts] = useState({});

  const [chatContact, setChatContact] = useState([]);
  const [showNewMessages, setShowNewMessages] = useState("getChat");
  const [loading, setLoading] = useState(false);
  const [lastSeen, setLastSeen] = useState("");
  const [chatWithUUID, setChatWithUUID] = useState("");
  const [chatWithName, setChatWithName] = useState("");
  const divRef = useRef();
  const inputRef = useRef();
  const [input, setInput] = useState("");

  const { setChatInfo, chatInfo } = useView();
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

  /**
   * Get Chat from server
   */
  const getChat = async () => {
    if (chatWithUUID !== "") {
      const result = await instance.request({
        data: {
          data_type: showNewMessages,
          params: { chatWith: chatWithUUID },
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
      // after finish load all data stop loading
      setLoading(false);
    }
  };

  const getChatFirstTime = async (uuid) => {
    const result = await instance.request({
      data: {
        data_type: "getChat",
        params: { chatWith: uuid },
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
      if (result?.data?.chatMessages) {
        setChatContact([
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

    // after finish load all data stop loading
    setLoading(false);
  };

  /**
   * Get lest seen from server
   */
  const getLastSeenChat = async () => {
    if (chatWithUUID !== "") {
      const result = await instance.request({
        data: {
          data_type: "getLastSeenChat",
          params: { chatWith: chatWithUUID },
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
    }
  };

  function handleClick(firstname, lastname, uuid) {
    if (chatWithUUID !== uuid) {
      setChatWithUUID(uuid);
      setChatWithName(`${firstname} ${lastname}`);
      getChatFirstTime(uuid);
      const chatWith = {
        adBlock: [],
        username: `${firstname} ${lastname}`,
        uuid: uuid,
        adID: "",
      };
      setChatInfo(chatWith);
      getLastSeenChat();
    }
  }

  /**
   * This use effect will render only once when the component loaded, when we close the contacts it will
   * end the interval.
   * Will refesh contacts every 1 second.
   */
  useEffect(() => {
    const Interval = setInterval(() => {
      getContacts();
      getChat();
      getLastSeenChat();
    }, 1000);
    return () => clearInterval(Interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This section will handle chat submit
   */
  /**
   * Handle sumbit button and Enter key button
   */
  const handleBtnlistener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      //console.log("Enter key was pressed. Run your function.");
      event.preventDefault();
      //console.log(input);
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
            chatWith: chatWithUUID,
            message: encryptMessage,
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
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
    }
    // reset our input to empty string
    setInput("");
  };


  // this function will scroll down to button when we load our messages
  useEffect(() => {
    if (divRef.current) divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [divRef]);
  // this function will scroll down to button when we load our messages
  useEffect(() => {
    if (divRef.current) divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [chatContact]);

  // scroll down when new messages comes
  useEffect(() => {
    if (chatWithUUID !== "") inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="screenSpliter">
      <div className="contactsScreen">
        {auth?.accessToken ? (
          <div
            className="chatContactsWindow"
            style={{
              ...styles.chatBoxWindowContant,
            }}
          >
            {contacts ? (
              Object.values(contacts).map((contact) => (
                <div
                  key={contact["uuid"]}
                  className="transition-3 contactWindow"
                  onClick={function () {
                    handleClick(
                      contact["first_name"],
                      contact["last_name"],
                      contact["uuid"]
                    );
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    ...{
                      backgroundColor: hovered ? "#E0E0E0" : "#ffffff",
                    },
                  }}
                >
                  {`${contact["first_name"]} ${contact["last_name"]}`}
                </div>
              ))
            ) : (
              <div>?????? ??'?????? ????????????</div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="messagesScreen">
        {chatWithUUID !== "" ? (
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
                <div className="userInfo">
                  <div>{`${chatWithName}`}</div>
                  <div>{`${lastSeen}`}</div>
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
              </div>
              {/* Footer */}
              <div className="chatWindowFooter">
                <div
                  className="left_pannel send_message_box"
                  id="send_message_box"
                >
                  <input
                    type="text"
                    id="text_box"
                    ref={inputRef}
                    autoComplete="off"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    aria-describedby="uidnote"
                    placeholder="???????? ???? ???????????? ??????"
                    onKeyPress={handleBtnlistener}
                  />
                  <input
                    type="button"
                    value="??????"
                    id="send_btn"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Messages;
