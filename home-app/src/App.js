import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./styles/App.css";
import Footer from "./Components/Footer.js";
import NavRoots from "./Components/NavRoots.js";
import Main from "./Components/Main.js";
import LoginPage from "./Components/LoginPage";
import AdsWithSearch from "./Components/AdsWithSearch.js";
import PackageDisplay from "./Components/PackageDisplay.js";
import CreatePackage from "./Components/CreatePackage.js";
import { useHistory } from "react-router-dom";
import Package1 from "./Components/Package1.js";
import AddAdForm from "./Components/AddAdForm.js";
import PackageFull from "./Components/PackageFull.js";
import Ads from "./Components/pages/Ads.jsx";
import AdFull from "./Components/AdFull.js";
import AddParameterToAds from "./Components/AddParameterToAds.js";

// NEW //
import Unauthorized from "./Components/pages/Unauthorized";
import Missing from "./Components/pages/Missing";
import Layout from "./Components/pages/Layout";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/PersistLogin";
import Settings from "./Components/pages/Settings";

const ROLES = {
  User: 2001,
  Admin: 5150,
};
//the outlet is in the middle part just after nav b4 footer
export default function App() {
  return (
    <div className="App">
      <NavRoots />
      <Routes>
        <Route exact path="/main" element={<Main />}>
          <Route exact path=":linkAd" element={<AdFull />} />
          <Route exact path="Ads" element={<Ads />} />
          <Route exact path="AddAdForm" element={<AddAdForm />} />
          <Route
            exact
            path="AddParameterToAds"
            element={<AddParameterToAds />}
          />
          <Route exact path="Login" element={<LoginPage />} />
          <Route exact path="adsWithSearch" element={<AdsWithSearch />} />
          <Route
            exact
            path="/main/packages/:packageId"
            element={<PackageFull />}
          />
          <Route exact path="packages" element={<PackageDisplay />} />
          <Route exact path="addPack" element={<CreatePackage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/adsWithSearch" element={<AdsWithSearch />} />
          <Route path="/Register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/Settings" element={<Settings />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Main />
      <Footer />
    </div>
  );
}
