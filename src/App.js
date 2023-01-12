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
import { useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants/constant";

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

  const handelPassword = (event) => {
    setPassword(event.target.value)
    console.log("password",event.target.value)
  }
//   const myStyle={
//     backgroundColor: "#ba57e8",
//     height: "100vh"
// };

  let FetchUser = async()=> {
    fetch(`${BASE_URL}/log/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password})
      }).then(res=>res.json()).then((data) => {
          setState({ open: true });

          localStorage.setItem('username', data.username)
          console.log("Username in App js", data.username);
          localStorage.setItem('authToken', JSON.stringify(data.access))
          navigate('/qc');
      })
  }
  return (
    <div className="App">
      {/* <div style={myStyle}></div> */}
      <div className="login-div">
        <img src={logo}></img>
          <div className="wel-div">
            <div>
              <Typography level="h4" component="h1" fontFamily={'Courier'} fontWeight={'semibold'}>
                <b>Welcome To Elf Dashboard!!</b>{'\n'}
              </Typography>
              <Typography level="body2" fontFamily={'Courier'} fontWeight={'semibold'}><b>Please Login</b></Typography>
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