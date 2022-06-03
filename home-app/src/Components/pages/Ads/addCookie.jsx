import React, { useState } from "react";
import Cookies from "universal-cookie";

const AddCookie = (adId) => {
  const [cookieAdd, setCookieAdd] = useState("");
  const cookies = new Cookies();
  const myAdsCookie = cookies.get("viewCookie");
  /**
   * Check that there is some cookies in users view
   */
  if (!(myAdsCookie === undefined)) {
    setCookieAdd(myAdsCookie);
    console.log(myAdsCookie);
  }
  cookies.set("viewCookie", cookieAdd, { path: "/" });
};

export default AddCookie;
