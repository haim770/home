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
import PackageDisplay from "./Components/PackageDisplay.js";
import CreatePackage from "./Components/CreatePackage.js";
import { DataProvider } from "./Components/Context";
import { useHistory } from "react-router-dom";
import Package1 from "./Components/Package1";
import PackageFull from "./Components/PackageFull";
//the outlet is in the middle part just after nav b4 footer
export default function App() {
  const api = new Api();
  let arr = [];
  return (
    <div className="App">
      <NavRoots />
      <Routes>
        <Route exact path="/main" element={<Main allAds={arr} api={api} />}>
          <Route exact path=":linkAd" element={<AdFull />} />
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
          <Route
            exact
            path="/main/packages/:packageId"
            element={<PackageFull />}
          />
          <Route exact path="packages" element={<PackageDisplay />} />
          <Route exact path= "addPack" element={<CreatePackage/>}/>
        </Route>
      </Routes>
      <Main />
      <Footer />
    </div>
  );
}
