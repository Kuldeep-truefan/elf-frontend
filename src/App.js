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
            <Route path="/qc"  element={<PrivateRoute component={Qc} />}/>
            <Route path="/am"  element={<PrivateRoute component={AudioMispronounced} />}/>
            <Route path="/audioqc"  element={<PrivateRoute component={AudioQc} />}/>
            <Route path="/redlip"  element={<PrivateRoute component={RedoLipSync} />}/>
            <Route path="/simpname"  element={<PrivateRoute component={SimplifiedNames} />}/>
            <Route path="/audiomt"  element={<PrivateRoute component={AudioMistreated} />}/>
            <Route path="/confpron"  element={<PrivateRoute component={ConfirmPronunciation} />}/>    
            <Route path="/videoupload"  element={<PrivateRoute component={VideoUpload} />}/>  
            <Route path="*"  element={<PageNotFound />}/>
          </Routes>
      </Suspense>
        </div>
      {/* </FilterContext.Provider> */}
    </QueryClientProvider>
  )
}

export default App
// export const useFilterContext = ()=>useContext(FilterContext)