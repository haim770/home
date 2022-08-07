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
import Register from "./Components/Register";
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/PersistLogin";
import Settings from "./Components/pages/users/Settings";
import Favorites from "./Components/Favorites.js";
import UserReportsToAds from "./Components/pages/users/Settings/Pages/UserReportsToAds";

// Chat
import Chat from "./Components/pages/Chat";
import { ViewProvidor } from "./Components/pages/Chat/ChatUseContext";

// Blog
import Blog from "./Components/pages/Blog";
import BlogId from "./Components/pages/Blog/pages/Blog";
import CreateBlog from "./Components/pages/Blog/components/home/NewBlog/CreateNewBlog"
// Settings
import Dashbord from "./Components/pages/users/Settings/Pages/Dashbord";
import Favorite from "./Components/pages/users/Settings/Pages/Favorite";
import Messages from "./Components/pages/users/Settings/Pages/Messages";
import Notifications from "./Components/pages/users/Settings/Pages/Notifications";
import PurchaseHistory from "./Components/pages/users/Settings/Pages/PurchaseHistory";
import ManageReports from "./Components/pages/users/Settings/Pages/ManageReports.js";
import SitePurchase from "./Components/pages/users/Settings/Pages/SitePurchase";
import SiteSales from "./Components/pages/users/Settings/Pages/SiteSales";
import SiteUsers from "./Components/pages/users/Settings/Pages/SiteUsers";
import UserAds from "./Components/pages/users/Settings/Pages/UserAds";
import UserSettings from "./Components/pages/users/Settings/Pages/UserSettings";
import SiteSettings from "./Components/pages/users/Settings/Pages/SiteSettings";
import Sidebar from "./Components/pages/users/Settings/sidebar/Sidebar";
import { PopupAdProvidor } from "./Components/pages/users/Settings/useContextReducer/PopupAdsContext";
import AddParameterToAds from "./Components/pages/users/Settings/Pages/AddParameterToAds";
import ChangeUserRule from "./Components/ChangeUserRule";
import UserShow from "./Components/UserShow";
import FavoritesAds from "./Components/FavoritesAds";
import EditAd from "./Components/pages/EditAd.js";
import HandlePackages from "./Components/pages/users/Settings/Pages/HandlePackages.jsx";
import HandleAdParams from "./Components/pages/users/Settings/Pages/HandleAdParams";
import EditParameterAds from "./Components/pages/users/Settings/Pages/EditParameterAds";

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
        <PopupAdProvidor>
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
              <Route path="/blog/:id" element={<BlogId />} />
              <Route
                exact
                path="/packages/:packageId"
                element={<PackageFull />}
              />
              <Route exact path="packages" element={<PackageDisplay />} />

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
                    <Route index element={<Dashbord />} />
                    <Route path="Dashbord" element={<Dashbord />} />
                    <Route path="Notifications" element={<Notifications />} />
                    <Route path="UserSettings" element={<UserSettings />} />
                    <Route path="Messages" element={<Messages />} />
                    <Route path="Ads" element={<UserAds />} />
                    <Route path="Favorite" element={<Favorite />} />
                    <Route path="EditAd" element={<EditAd />} />
                    <Route path="Purchase" element={<PurchaseHistory />} />
                    <Route
                      path="UserReportsToAds"
                      element={<UserReportsToAds />}
                    />
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          path="ManageReports"
                          element={<ManageReports />}
                        />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          exact
                          path="addPack"
                          element={<CreatePackage />}
                        />
                      </Route>
                    </Route>
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
                        <Route
                          path="addParameterToAds"
                          element={<AddParameterToAds />}
                        />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          path="handleAdParams"
                          element={<HandleAdParams />}
                        />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          path="editAdsParams"
                          element={<EditParameterAds />}
                        />
                      </Route>
                    </Route>

                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          path="changeUserRule"
                          element={<ChangeUserRule />}
                        />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="favorites" element={<FavoritesAds />} />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route path="userShow" element={<UserShow />} />
                      </Route>
                    </Route>
                    <Route element={<PersistLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                      >
                        <Route
                          path="HandlePackages"
                          element={<HandlePackages />}
                        />
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
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="/Blog/Create" element={<CreateBlog />} />
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
        </PopupAdProvidor>
      </ViewProvidor>
      <Footer />
    </div>
  );
}
