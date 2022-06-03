import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from "universal-cookie";

const AddCookie = (props) => {
    console.log(props);
  const cookies = new Cookies();
  let myAdsCookie = cookies.get("viewCookie");
  /**
   * Check that there is some cookies in users view
   */
  if (!(myAdsCookie === undefined) && (props.adID[0].adID !== "undefined")) {
    myAdsCookie = myAdsCookie.concat("::", props.adID[0].adID);
    const uniq = [...new Set(myAdsCookie.split("::"))];
      myAdsCookie = uniq.join("::");
  }
  else{
      myAdsCookie = props.adID[0].adID;
  }

  cookies.set("viewCookie", myAdsCookie, { path: "/" });
  useEffect(()=>{
  },[])
  return <></>
};   

export default AddCookie