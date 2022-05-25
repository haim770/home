import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Footer from "./Components/Footer.js";
import NavRoots from "./Components/NavRoots.js";
import Main from "./Components/Main.js";
import AdsWithSearch from "./Components/AdsWithSearch.js";
import AdFull from "./Components/AdFull";
import PackageFull from "./Components/PackageFull";
import PackageDisplay from "./Components/PackageDisplay.js";
import CreatePackage from "./Components/CreatePackage.js";

// NEW //
import Unauthorized from "./Components/pages/Unauthorized";
import Missing from "./Components/pages/Missing";
import Layout from "./Components/pages/Layout";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/PersistLogin";
import Settings from "./Components/pages/Settings";
import TryAds from "./Components/TryAds";

// Chat
import Chat from "./Components/pages/Chat";
import { ViewProvidor } from "./Components/pages/Chat/ChatUseContext";

// Blog
import Blog from "./Components/pages/Blog";

const ROLES = {
  User: 2001,
  Admin: 5150,
};
//the outlet is in the middle part just after nav b4 footer
export default function App() {
  return (
    <div className="App">
      {/* viewprovidor let all children of this provider to use the chat */}
      <ViewProvidor>
        <NavRoots />
        <Chat />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/adsWithSearch" element={<AdsWithSearch />} />
            <Route exact path=":linkAd" element={<AdFull />} />
            <Route
              exact
              path="/main/packages/:packageId"
              element={<PackageFull />}
            />
            <Route exact path="packages" element={<PackageDisplay />} />
            <Route exact path="addPack" element={<CreatePackage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />
        
            <Route exact path="/Blog" element={<Blog />} />
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
        <TryAds />
        <Main />
      </ViewProvidor>
      <Footer />
    </div>
  );
}
