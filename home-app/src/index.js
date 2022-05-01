import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./expenses";
import Invoices from "./invoices";
import Invoice from "./invoice";
import Parameter from "./Components/Parameter";
import TestAxios from "./testAxios";
import Register from "./users/Register";
import Nav from "./Components/Nav";
import ListAds from "./Components/ListAds";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="nav" element={<Nav />} />
          <Route path="listAds" element={<ListAds />} />
          <Route path="testAxios" element={<TestAxios />} />
          <Route path="parameter" element={<Parameter paramName={"3"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
