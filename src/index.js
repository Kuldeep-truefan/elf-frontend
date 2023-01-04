import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  Route,
  Link,
  BrowserRouter  as Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Qc from "./Qc";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import Nav from "./Nav";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/" element={<PrivateRoute/>}/>
        <Route path="/qc" element={<Qc />}/>
        <Route path="/nf" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);