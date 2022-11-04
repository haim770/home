import React, { useLayoutEffect, useState } from "react";
import useDH from "../../../../Auth/DH/DHUseContext";
import useView from "../ChatUseContext";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";

const MessageBlock = (props) => {
  const { chatInfo } = useView();
  const { decryptAES } = useDH();
  const data = props.props;
  console.log(decryptAES(data.message));

  //console.log(data);
  /**
   * Set alice (us) and Bob(other) message tempalte
   */

  /**
   * check if message sent today
   */
  const isToday = (date) => {
    // 👇️ Today's date
    const today = new Date();
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
    return false;
  };

  // function to return bob message template(other msg)
  const msgID = data.msgid;
  const date = new Date(data.dateMsg);
  let timeShow = date.getHours() + ":" + date.getMinutes();

  if (!isToday(date)) {
    timeShow =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear().toString().substr(-2) +
      " " +
      timeShow;
  }

  /**
   * Alice = us
   * Bob = sender
   */
  const linkToAd = data.adId != "" ? true : false;
  const aliceOrBob = data.sender === chatInfo.uuid; // if true, means we got message
  return aliceOrBob ? (
    <div className="bob_message" id={msgID} key={msgID}>
      <p>
        {linkToAd ? (
          <Link
            to={{
              pathname:
                "/AdsWithSearch/" + decryptAES(data.message).split(" ")[4],
            }}
          >
            לחץ כאן למעבר למודעה {decryptAES(data.message)}
          </Link>
        ) : (
          decryptAES(data.message)
        )}
      </p>
      <span>{timeShow}</span>
    </div>
  ) : (
    <div className="alice_message" id={msgID} key={msgID}>
      <p>
        {linkToAd ? (
          <Link
            to={{
              pathname:
                "/AdsWithSearch/" + decryptAES(data.message).split(" ")[4],
            }}
          >
            לחץ כאן למעבר למודעה {decryptAES(data.message)}
          </Link>
        ) : (
          decryptAES(data.message)
        )}
      </p>
      <div className="alice_container">
        <span>{timeShow}</span>
        <span>
          {data.seen == "1" ? (
            <BsCheck2All />
          ) : data.received == "1" ? (
            <BsCheck2 />
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

// END OF ALICE AND BOB MESSAGE TEMPLATE

export default MessageBlock;
