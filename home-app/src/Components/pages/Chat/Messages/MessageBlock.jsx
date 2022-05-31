import React, { useLayoutEffect, useState } from "react";
import useView from "../ChatUseContext";
const MessageBlock = (props) => {
const { chatInfo } = useView();

const data = props.props;
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
      <div class="bob_message" id={msgID} key={msgID}>
        <p>{data.message}</p>
        <div class="bob_container">
          <span>{timeShow}</span>
        </div>
      </div>
    ) : (
      <div class="alice_message" id={msgID} key={msgID}>
        <p>{data.message}</p>
        <div class="alice_container">
          <span>{timeShow}</span>
          <span>V</span>
        </div>
      </div>
    );
  }

  // END OF ALICE AND BOB MESSAGE TEMPLATE

export default MessageBlock