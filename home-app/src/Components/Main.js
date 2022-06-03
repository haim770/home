import React,{useState} from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Home = () => {
  const [cookie, setCookie] = useState("");
  const handleLogin= ()=>{
    const cookies = new Cookies();
    const myCookie = cookies.get("viewCookie");
    if (!(myCookie === undefined)) {
      setCookie(myCookie);
    }
  }

  useEffect(()=>{
    handleLogin();
  },[])
  //console.log(cookie);
  return (
    <div>
      {cookie}
    </div>
  );
};

export default Home;
