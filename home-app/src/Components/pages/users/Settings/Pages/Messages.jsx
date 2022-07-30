import React, { useEffect, useLayoutEffect, useState } from "react";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
import { styles } from "./Styles/styles";
import "./Styles/messagesStyles.css";

const Messages = () => {
  const { auth } = useAuth();

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

  function handleClick(firstname, lastname, uuid) {
    const chatWith = {
      adBlock: [],
      username: `${firstname} ${lastname}`,
      uuid: uuid,
      adID: "",
    };
    // NEED TO ADD START CHAT HERE
  }

  /**
   * This use effect will render only once when the component loaded, when we close the contacts it will
   * end the interval.
   * Will refesh contacts every 1 second.
   */
  useEffect(() => {
    const Interval = setInterval(() => {
      getContacts();
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

  /* This convert object to array and map it */ /*
  return auth?.accessToken ? (
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
  );
};*/

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
        ) : (<></>
        )}
      </div>
      <div className="messagesScreen">
        
      </div>
    </div>
  );
};

export default Messages;