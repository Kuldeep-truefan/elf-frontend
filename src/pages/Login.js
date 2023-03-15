import "../../src/App.css";
import TextField from "@mui/material/TextField";
import logo from "../assets/img/logo.png";
import { Typography } from "@mui/material";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handelUsername = (text) => {
    setUsername(text)
  }

  const handelPassword = (event) => {
    setPassword(event.target.value)
    console.log("password",event.target.value)
  }

  const [isAuth] = useAuth();

  let FetchUser = async(e)=> {
    e.preventDefault();
    setIsFetching(true)
    fetch(`${BASE_URL}/log/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password})
      })
      .then(res=>{
        if(res.status === 401){
          throw new Error('Username and password does not match')
        }
        return res.json()}
        )
      .then((data) => {
          setState({ open: true });
          localStorage.setItem('username', data.username)
          localStorage.setItem('authToken', JSON.stringify(data.access))
          navigate('/');
          setErrMsg('')
      })
      .catch((err)=>{
        console.log(err)
        setErrMsg(err.message)
      })
      .finally(()=>{
        setIsFetching(false)
      })
  }

  return isAuth?
  <Navigate to='/dashboard'/>
  :
    (
  <div className="App">
    <form onSubmit={(e)=>FetchUser(e)} style={{display:'flex',alignItems:'center'}}>
      <div className="login-div">
        <img src={logo}></img>
          <div className="wel-div">
            <div>
              <Typography level="h4" component="h1" fontFamily={'Courier'} fontWeight={'semibold'}>
                Welcome To Elf Dashboard!!
              </Typography>
              {/* <Typography level="body2" fontFamily={'Courier'} fontWeight={'semibold'}><b>Please Login</b></Typography> */}
            </div>
          </div>
        <div className="main-txt-btns">
          <div className="txt-btns">
            <TextField
              onChange={(e)=>{ 
            setUsername(e.target.value)
            }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              sx={{
                width: 300
            }}
            />
          </div>
          <div className="txt-btns">
              <FormControl sx={{
                width: 300
            }}
              variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                
              onChange={(e)=>{ 
                setPassword(e.target.value)
              }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        </div>
        <button 
        className="primary-btn w-100"
        >
          {
            isFetching?'Login...':'Login'
          }
          </button>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Sucessfully Logged In!!"
        key={vertical + horizontal}
      />
      <p style={{textAlign:"left",color:"#ff0000",margin:'5px 0',fontSize:'12px'}}>
        <i>
          {errMsg}
        </i>
      </p>
      </div>
    </form>
  </div>
  )
      
}

export default Login;