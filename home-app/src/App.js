import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
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
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

//the app in my end so the components woukd work

// import React, { useState } from "react";
// import Nav from "./Components/Nav";
// import ListAds from "./Components/ListAds";
// import BlogList from "./Components/BlogList";
// import "./App.css";
// function App() {
//   const [visibleListAds, setVisibleListAds] = useState("listAds");
//   const changeListAdsVisibility = () => {
//     setVisibleListAds("listNotVisible");
//   };
//   return (
//     <div className="App">
//       {/* <Nav
//         changeListAdsVisibility={changeListAdsVisibility}
//         onClick={changeListAdsVisibility}
//       />
//       <BlogList className={visibleListAds} /> */}
//       <ListAds
//         className={visibleListAds}

//         // adsArr={[
//         //   [1, "haifa", "hatichon", "1", 1000, "01/04/1111", "haim.co.il"],
//         //   [
//         //     2,
//         //     "afula",
//         //     "lidors street",
//         //     "5",
//         //     101200,
//         //     "01/04/2001",
//         //     "lidor.co.il",
//         //   ],
//         // ]}
//       />
//     </div>
//   );
// }

// export default App;
