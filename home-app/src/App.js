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
import CreateNewAd from "./Components/pages/Ads/CreateNewAd";
import ConfirmAdManager from "./Components/ConfirmAdManager";

// NEW //
import Unauthorized from "./Components/pages/Unauthorized";
import Missing from "./Components/pages/Missing";
import Layout from "./Components/pages/Layout";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/PersistLogin";
import Settings from "./Components/pages/users/Settings";

// Chat
import Chat from "./Components/pages/Chat";
import { ViewProvidor } from "./Components/pages/Chat/ChatUseContext";

// Blog
import Blog from "./Components/pages/Blog";
import Single from "./Components/pages/Blog/posts/Single";
//paypal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Components/Checkout.js";
// Settings
import Dashbord from "./Components/pages/users/Settings/Pages/Dashbord";
import Favorite from "./Components/pages/users/Settings/Pages/Favorite";
import Messages from "./Components/pages/users/Settings/Pages/Messages";
import Notifications from "./Components/pages/users/Settings/Pages/Notifications";
import PurchaseHistory from "./Components/pages/users/Settings/Pages/PurchaseHistory";
import Reports from "./Components/pages/users/Settings/Pages/Reports";
import SitePurchase from "./Components/pages/users/Settings/Pages/SitePurchase";
import SiteSales from "./Components/pages/users/Settings/Pages/SiteSales";
import SiteUsers from "./Components/pages/users/Settings/Pages/SiteUsers";
import UserAds from "./Components/pages/users/Settings/Pages/UserAds";
import UserSettings from "./Components/pages/users/Settings/Pages/UserSettings";
import SiteSettings from "./Components/pages/users/Settings/Pages/SiteSettings";
const ROLES = {
  User: 2001,
  Admin: 5150,
};
//the outlet is in the middle part just after nav b4 footer
export default function App() {
  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          "client-id":
            "ASXZvWdmYTGVe7D0eKiAddQjocGsHoxmtxsymlrHAvQr2_Z0uLMX9ZOOfHjMAhUrjGBrFe5o_dOCSu-Y",
        }}
      >
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
              <Route exact path="/adsWithSearch/:linkAd" element={<AdFull />} />
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
                  }
                >
                  <Route path="/Settings" element={<Settings />}>
                    <Route path="Dashbord" element={<Dashbord />} />
                    <Route path="Notifications" element={<Notifications />} />
                    <Route path="UserSettings" element={<UserSettings />} />
                    <Route path="Messages" element={<Messages />} />
                    <Route path="Reports" element={<Reports />} />
                    <Route path="Ads" element={<UserAds />} />
                    <Route path="Favorite" element={<Favorite />} />
                    <Route path="Purchase" element={<PurchaseHistory />} />

                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="Users" element={<SiteUsers />} />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="Sales" element={<SiteSales />} />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="SitePurchase" element={<SitePurchase />} />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="SiteSettings" element={<SiteSettings />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                  }
                >
                  <Route path="/createPackage" element={<CreatePackage />} />
                  <Route path="/packages" element={<PackageDisplay />}></Route>
                  <Route path="/addAd" element={<CreateNewAd />} />
                  <Route
                    path="/confirmAdManager"
                    element={<ConfirmAdManager />}
                  />
                </Route>
              </Route>
              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </ViewProvidor>
      </PayPalScriptProvider>
      <Footer />
    </div>
  );
}
