import './App.css';
import logo1 from "./img/logo1.png";
// import TextField from '@mui/material/TextField';
// import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react';

function Nav() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  const [state, setState] = useState('false')
  const handleMenu = () => {
    setState(!state)
    console.log("State",state)
  }
  return (
    <div className="Nav">
      {/* <MenuRoundedIcon fontSize='large'  style={{ color: 'white' }}/> */}
      <Sidebar onClick={handleMenu}/>
      <img src={logo1}/>
      <div className='logout-nav'>
      <h4 className='user-name'>admin</h4>
      <Button onClick={handleClick} className='logout-btn' variant="outlined" style={{color: 'white', border: '0.5px solid white'}} >Logout</Button>
      </div>
    </div>
  );
}

export default Nav;