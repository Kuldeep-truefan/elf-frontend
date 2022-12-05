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
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Qc from "./Qc";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<App />}></Route>
        <Route path="/qc" element={<Qc />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);