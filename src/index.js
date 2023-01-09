import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import {
  Route,
  Link,
  BrowserRouter  as Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import Nav from "./Nav";
import AudioMispronounced from "./pages/AudioMispronounced";
import Qc from "./pages/Qc";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        {/* Private Routes Should come under this. */}
        <Route path="/" element={<PrivateRoute/>}>
        <Route path="/qc" element={<Qc />}/>
        <Route path="/am" element={<AudioMispronounced />}/>
        <Route path="/nf" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);