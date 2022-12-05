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
import { pink } from "@mui/material/colors";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    navigate('/qc');
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // const handleClick = () => navigate('/login');
  return (
    <div className="App">
      <div className="login-div">
        <img src={logo}></img>
        <div className="main-txt-btns">
          <div className="txt-btns">
            <TextField
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
          onClick={handleClick({
          vertical: 'top',
          horizontal: 'right',
        })}>Login</Button>
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