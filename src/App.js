import React, { createContext, lazy, Suspense, useContext, useReducer } from 'react';
import "./index.css";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Nav from "./pages/Nav";
import { filterReducer } from './components/filter/FilterReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

// const FilterContext = createContext()


const App = () => {
  const location = useLocation();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })

  const [state,dispatch] = useReducer(filterReducer,{vas:false})
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* <FilterContext.Provider value={{state,dispatch}} > */}
        <div>{location.pathname!=="/login"&& <Nav/>}
        <Suspense fallback={null}>
          <OfflineInternet/>
          <Routes>
            <Route path="/" element={<PrivateRoute component={Dashboard} />} />
            <Route path='/login' element={<Login/>} />
            <Route path="/quality-check"  element={<PrivateRoute component={Qc} />}/>
            <Route path="/audio-mispronounced"  element={<PrivateRoute component={AudioMispronounced} />}/>
            <Route path="/audio-qc"  element={<PrivateRoute component={AudioQc} />}/>
            <Route path="/redo-lip-sync"  element={<PrivateRoute component={RedoLipSync} />}/>
            <Route path="/simplified-names"  element={<PrivateRoute component={SimplifiedNames} />}/>
            <Route path="/audio-mistreated"  element={<PrivateRoute component={AudioMistreated} />}/>
            <Route path="/confirm-pronounciation"  element={<PrivateRoute component={ConfirmPronunciation} />}/>    
            <Route path="/upload-video"  element={<PrivateRoute component={VideoUpload} />}/>  
            <Route path="*"  element={<PageNotFound />}/>
          </Routes>
      </Suspense>
      <ToastContainer />
        </div>
      {/* </FilterContext.Provider> */}
    </QueryClientProvider>
  )
}

export default App
// export const useFilterContext = ()=>useContext(FilterContext)