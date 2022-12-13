import "./App.css";
import TextField from "@mui/material/TextField";
import logo from "./img/logo.png";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // const handleClick = () => navigate('/login');
  const handelUsername = (text) => {
    setUsername(text)
    // console.log("usnerame",event.target.value)
  }

  // useEffect(()=>{
  //   console.log(username, 'anshul login')
  // },[username])

  const handelPassword = (event) => {
    setPassword(event.target.value)
    console.log("password",event.target.value)
  }


  let FetchUser = async()=> {
    fetch(`http://127.0.0.1:7000/log/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password})
    }).then(res=>{
      if (res.status == 200) {
        setState({ open: true });
        navigate('/qc');
      }
      // else{
      //   setState({ open: false});
      // }
      console.log('Response',res)})
  }
  return (
    <div className="App">
      <div className="login-div">
        <img src={logo}></img>
          <div className="wel-div">
            <div>
              <Typography level="h4" component="h1" fontFamily={'Courier'} fontWeight={'semibold'}>
                <b>Welcome!</b>
              </Typography>
              <Typography level="body2" fontFamily={'Courier'} fontWeight={'semibold'}>Sign in to continue.</Typography>
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
            <TextField
              onChange={handelPassword}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{
                width: 300
            }}
            />
          </div>
          <div className="txt-btns">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography
                    style={{
                      color: "#000000",
                      fontSize: "0.9rem",
                    }}
                  >
                    Remember Me
                  </Typography>
                }
              />
            </FormGroup>
          </div>
        </div>
        <Button variant="outlined" 
          onClick={()=>{FetchUser()}}>Login</Button>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Sucessfully Logged In!!"
        key={vertical + horizontal}
      />
      </div>
    </div>
  );
}

export default App;