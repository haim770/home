import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./styles/App.css";
import ListAds from "./Components/ListAds.js";
import Footer from "./Components/Footer.js";
import Nav from "./Components/Nav";
import NavRoots from "./Components/NavRoots.js";
import { v4 as uuidv4 } from "uuid";
import Main from "./Components/Main.js";
import Register from "./Components/Register";
import AdFull from "./Components/AdFull";
import Api from "./api/Api.js";
import Ads from "./Components/pages/Ads";
import AdBlock from "./Components/pages/AdsBlock";
import AddAdForm from "./Components/AddAdForm";
import LoginPage from "./Components/LoginPage";
import AddParameterToAds from "./Components/AddParameterToAds.js";
import AdsWithSearch from "./Components/AdsWithSearch.js";
import { useHistory } from "react-router-dom";
//the outlet is in the middle part just after nav b4 footer
export default function App() {
  const api = new Api();
  let arr = [];
  return (
    <div className="App">
      <NavRoots />
      <Routes>
        <Route exact path="/main" element={<Main allAds={arr} api={api} />}>
          {/* <Route
            exact
            path="ListAds"
            element={<ListAds api={api} allAds={arr} />}
          /> */}
          <Route exact path=":linkAd" element={<AdFull/>} />
          <Route exact path="Ads" element={<Ads />} />
          <Route exact path="AddAdForm" element={<AddAdForm api={api} />} />
          <Route
            exact
            path="AddParameterToAds"
            element={<AddParameterToAds api={api} />}
          />
          <Route exact path="Login" element={<LoginPage api={api} />} />
          <Route
            exact
            path="adsWithSearch"
            element={<AdsWithSearch api={api} />}
          />
        </Route>
      </Routes>
      <Main />
      <Footer />
    </div>
  );
}
