import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //router for app first component which wil include another components asterix is a joker 
  <React.StrictMode>
    <Router>
      <Routes>
        <Route  path="*" element={<App/>}> </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
