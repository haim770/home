import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
import { styles } from "./Styles/styles";
import "./Styles/messagesStyles.css";
import MessageBlock from "../../../Chat/Messages/MessageBlock";
import "../../../Chat/styles.css";
import useView from "../../../Chat/ChatUseContext";


const Messages = () => {
  const { auth } = useAuth();

  const [hovered, setHovered] = useState(false);
  const [contacts, setContacts] = useState({});

  const [chatContact, setChatContact] = useState([]);
  const [showNewMessages, setShowNewMessages] = useState("getChat");
  const [loading, setLoading] = useState(false);

  const [chatWithUUID, setChatWithUUID] = useState("");
  const [chatWithName, setChatWithName] = useState("");
  const divRef = useRef();
  const inputRef = useRef();
  const [input, setInput] = useState("");

  const { setChatInfo } = useView();
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
                  key: anObjectMapped["msgid"],
                  msgData: anObjectMapped,
                };
              }
            ),
          ]);
        }

        if (result?.data?.newMessageUpdate > 0) {
          //console.log(result.data);
        }
      }
      // after finish load all data stop loading
      setLoading(false);
    }
  };

  function handleClick(firstname, lastname, uuid) {
    setChatWithUUID(uuid);
    setChatWithName(`${firstname} ${lastname}`);

        const chatWith = {
          adBlock: [],
          username: `${firstname} ${lastname}`,
          uuid: uuid,
          adID: "",
        };
    setChatInfo(chatWith);
    getChat();
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
      const result = await instance.request({
        data: {
          data_type: "submitMessage",
          params: {
            chatWith: chatWithUUID,
            message: input,
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      // console.log(result.data);
      // check if we got new data from server or any response
      if (result?.data) {
        if (result?.data?.chatMessages) {
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
              <div>אין צ'טים פעילים</div>
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
                  <div>{`${chatWithUUID}`}</div>
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
                    placeholder="רשום את ההודעה שלך"
                    onKeyPress={handleBtnlistener}
                  />
                  <input
                    type="button"
                    value="שלח"
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
