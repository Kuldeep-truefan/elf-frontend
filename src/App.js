import React, {lazy, Suspense} from 'react'
import "./index.css";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Nav from"./pages/Nav";

const OfflineInternet = lazy(()=> import('./constants/OfflineInternet'));
const PrivateRoute = lazy(()=> import("./components/PrivateRoute"));
const PageNotFound = lazy(()=>import("./components/PageNotFound"));
const Login = lazy(()=>import("./pages/Login"));
const AudioMispronounced = lazy(()=>import("./pages/AudioMispronounced"));
const Qc = lazy(()=>import("./pages/Qc"));
const AudioQc = lazy(()=>import("./pages/AudioQc"));
const RedoLipSync = lazy(()=>import("./pages/RedoLipSync"));
const SimplifiedNames = lazy(()=>import("./pages/SimplifiedNames"));
const AudioMistreated = lazy(()=>import('./pages/AudioMistreated'));
const ConfirmPronunciation = lazy(()=>import('./pages/ConfirmPronunciation'));
const Dashboard = lazy(()=>import('./pages/Dashboard'));
const VideoUpload = lazy(()=>import("../src/pages/VideoUpload"));


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
      <div>{location.pathname!=="/login"&& <Nav/>}
      <Suspense fallback={<>Loading...</>}>
        <OfflineInternet/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/qc" element={<Qc />}/>
            <Route path="/am" element={<AudioMispronounced />}/>
            <Route path="/audioqc" element={<AudioQc/>}/>
            <Route path="/redlip" element={<RedoLipSync/>}/>
            <Route path="/simpname" element={<SimplifiedNames/>}/>
            <Route path="/audiomt" element={<AudioMistreated/>}/>
            <Route path="/confpron" element={<ConfirmPronunciation/>}/>    
            <Route path="/videoupload" element={<VideoUpload/>}/>    
            {/* not found */}
            <Route path="*" element={<PageNotFound/>}/>  
            <Route path="/nf" element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </Suspense>
      </div>
    </QueryClientProvider>
  )
}

export default App