import React, { useLayoutEffect, useState } from "react";
import useDH from "../../../../Auth/DH/DHUseContext";
import useView from "../ChatUseContext";
const MessageBlock = (props) => {
const { chatInfo } = useView();
const { decryptAES } = useDH();
const data = props.props;
console.log(data);
  /**
   * Set alice (us) and Bob(other) message tempalte
   */

  /**
   * check if message sent today
   */
  const isToday = (date)=> {
    // 👇️ Today's date
    const today = new Date();
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
    return false;
  }

  // function to return bob message template(other msg)
    const msgID = data.msgid;
    const date = new Date(data.dateMsg);
    let timeShow = (date.getHours() + ":" + date.getMinutes());
    
      if (!isToday(date)) {
              timeShow = (
                date.getDate() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getFullYear().toString().substr(-2) +
                  " " +
                  timeShow
              );
            }
      
    /**
     * Alice = us
     * Bob = sender
     */
    const aliceOrBob = data.sender === chatInfo.uuid; // if true, means we got message
    return aliceOrBob ? (
      <div className="bob_message" id={msgID} key={msgID}>
        <p>{decryptAES(data.message)}</p>
        <span>{timeShow}</span>
      </div>
    ) : (
      <div className="alice_message" id={msgID} key={msgID}>
        <p>{decryptAES(data.message)}</p>
        <div className="alice_container">
          <span>{timeShow}</span>
          <span>V</span>
        </div>
      </div>
    );
  }

  // END OF ALICE AND BOB MESSAGE TEMPLATE

export default MessageBlock