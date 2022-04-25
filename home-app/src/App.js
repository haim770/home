import { Outlet, Link } from "react-router-dom";
import "./App.css";
import ListAds from "./Components/ListAds.js";


/* This is a sample of new React routers 6 */
export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/testAxios">Test Axios</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
      </nav>
      <ListAds />
      <Outlet />
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
