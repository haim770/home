import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./styles/App.css";
import ListAds from "./Components/ListAds.js";
import Footer from "./Components/Footer.js";
import Nav from "./Components/Nav";
import { v4 as uuidv4 } from "uuid";
import Main from "./Components/Main.js"
import Register from "./Components/Register";
import Api from "./api/Api.js";

//the outlet is in the middle part just after nav b4 footer
export default function App() {
  const api=new Api();
  return (
    <div className="App">
      <Nav />
      <Main/>
      <Register api={api}/>
    <Footer/>
    </div>
  );
}

//the app in my end so the components woukd work

// import React, { useState } from "react";
// import Nav from "./Components/Nav";
// import ListAds from "./Components/ListAds";
// import BlogList from "./Components/BlogList";
// import AddAdForm from "./Components/AddAdForm";
// import "./App.css";
// function App() {
//   const [classNameAds, setclassNameAds] = useState("listAds");
//   const [classNameAddAdForm, setclassNameAddAdForm] = useState("formAddAd");
//   const [listAds, setListAds] = useState([
//     [1, "haifa", "hatichon", "1", 1000, "01/04/1111", "haim.co.il"],
//     [2, "afula", "lidors street", "5", 101200, "01/04/2001", "lidor.co.il"],
//   ]);
//   const changeListAds = (newAdList) => {
//     setListAds(newAdList);
//   };
//   const changeListAdsClassName = (classNameChange) => {
//     setclassNameAds("listNotVisible");
//   };
//   const changeclassNameAddAdForm = (classNameChange) => {
//     setclassNameAddAdForm("notVisible");
//   };
//   return (
//     <div className="App">
//       <AddAdForm
//         listAds={listAds}
//         setListAds={setListAds}
//         changeListAds={changeListAds}
//         legnthOfArr={listAds.length}
//         className={classNameAddAdForm}
//       />
//       <Nav
//         changeListAdsVisibility={changeListAdsClassName}
//         changeclassNameAddAdForm={changeclassNameAddAdForm}
//       />
//       <ListAds className={classNameAds} adsArr={listAds} />
//       <p>
//         <button
//           style={{ color: "red" }}
//           onClick={() => console.log(listAds)}
//         ></button>
//       </p>
//     </div>
//   );
// }

// export default App;
