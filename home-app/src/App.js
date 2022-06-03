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
import FormAdContent from "./Components/FormAdContent.js";

// NEW //
import Unauthorized from "./Components/pages/Unauthorized";
import Missing from "./Components/pages/Missing";
import Layout from "./Components/pages/Layout";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/PersistLogin";
import Settings from "./Components/pages/users/Settings";
import TryAds from "./Components/TryAds";
import UploadFile from "./Components/UploadFile.js";

// Chat
import Chat from "./Components/pages/Chat";
import { ViewProvidor } from "./Components/pages/Chat/ChatUseContext";

// Blog
import Blog from "./Components/pages/Blog";
import Single from "./Components/pages/Blog/posts/Single";


import FileUpload from "./Components/FileUpload";


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
        <PersistLogin />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/adsWithSearch" element={<AdsWithSearch />} />
            <Route exact path=":linkAd" element={<AdFull />} />
            <Route path="/post/:postId" element={<Single />} />
            <Route
              exact
              path="/packages/:packageId"
              element={<PackageFull />}
            />
            <Route exact path="packages" element={<PackageDisplay />} />
            <Route exact path="addPack" element={<CreatePackage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route exact path="/Blog" element={<Blog />} />


            {/* we want to protect these routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                }>
                <Route path="/Settings" element={<Settings />} />
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </ViewProvidor>
      {/* <FormAdContent /> */}
      <Footer />
    </div>
  );
}
