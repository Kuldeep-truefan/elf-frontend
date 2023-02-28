import React from 'react'
import "./index.css";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Dashboard from './pages/Dashboard';
import VideoUpload from '../src/pages/VideoUpload';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import OfflineInternet from './constants/OfflineInternet';

const App = () => {
  const location = useLocation();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })
  
  return (
    <QueryClientProvider client={queryClient}>
    <div>{location.pathname!=="/"&& <Nav/>}
    <OfflineInternet/>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/" element={<PrivateRoute/>}>
        <Route path="/home" element={<Dashboard />}/>
        <Route path="/qc" element={<Qc />}/>
        <Route path="/am" element={<AudioMispronounced />}/>
        <Route path="/audioqc" element={<AudioQc/>}/>
        <Route path="/redlip" element={<RedoLipSync/>}/>
        <Route path="/simpname" element={<SimplifiedNames/>}/>
        <Route path="/audiomt" element={<AudioMistreated/>}/>
        <Route path="/confpron" element={<ConfirmPronunciation/>}/>    
        <Route path="/videoupload" element={<VideoUpload/>}/>    

        <Route path="*" element={<PageNotFound/>}/>  
        <Route path="/nf" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </div>
    </QueryClientProvider>
  )
}

export default App