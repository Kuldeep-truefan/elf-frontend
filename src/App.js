import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login"
import AudioMispronounced from "./pages/AudioMispronounced";
import Qc from "./pages/Qc";
import Nav from './pages/Nav';
import AudioQc from './pages/AudioQc';
import RedoLipSync from './pages/RedoLipSync';
import SimplifiedNames from './pages/SimplifiedNames';
import AudioMistreated from './pages/AudioMistreated';
import ConfirmPronunciation from './pages/ConfirmPronunciation';

const App = () => {
  const location = useLocation();
  return (
    <div>{location.pathname!=="/"&& <Nav/>}
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/" element={<PrivateRoute/>}>
          
        <Route path="/qc" element={<Qc />}/>
        <Route path="/am" element={<AudioMispronounced />}/>
        <Route path="/audioqc" element={<AudioQc/>}/>
        <Route path="/redlip" element={<RedoLipSync/>}/>
        <Route path="/simpname" element={<SimplifiedNames/>}/>
        <Route path="/audiomt" element={<AudioMistreated/>}/>
        <Route path="/confpron" element={<ConfirmPronunciation/>}/>    

        <Route path="*" element={<PageNotFound/>}/>  
        <Route path="/nf" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App