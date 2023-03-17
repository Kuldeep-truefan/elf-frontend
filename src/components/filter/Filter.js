import React, { useState } from 'react';
import './filter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useGetCelebsAndOccasions from '../../hooks/useGetCelebsAndOccasions';
import { Chip, TextField } from '@mui/material';

const Filter = () => {
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    vas: [],
    celebrity_name:[],
    occasion:[]
  });
  
  const [value, setInputValue] = useState("");

  const celebs = useGetCelebsAndOccasions('/audio/get-celeb-list').data.map((celeb)=>celeb.name)
  // console.log(celebs)
  const {data:occasions} = useGetCelebsAndOccasions('/audio/get-occasion-list')


  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangeCelebrity = (e, newValue)=>{
    setFilterData({...filterData,celebrity_name: [...newValue]});
  }
  const handleKeyDownCelebrity = (event)=>{
    const inputValue = event.target.value.trim();
    if (
      event.key === "Enter" &&
      inputValue.length > 0 &&
      /^\S+$/.test(inputValue)
    ) {
      setFilterData((prevValue) =>({...prevValue, celebrity_name:[...prevValue.celebrity_name, inputValue]}));
      // event.target.value = "";
      setInputValue('')
      console.log('enter')
    }
  }

  return (
    <div id='filter'>
      <div onClick={handleOpen} className='filter-btn' ><FilterAltIcon /></div>
      <div id='filter-card' className={`${open ? 'opened' : ''}`}>
        <div id='filter-card-wrapper'>
          <div onClick={handleClose} className='filter-btn close-btn'><CancelIcon /></div>
          <div id='filter-card-inner'>
            <h5>Filter</h5>
            <div className='filter-group'>
              <div className='filter-label'>
                <h6>Vas</h6>
              </div>
              <div className='filter-options'>
                <div className='filter-option'>
                  <input type='checkbox' name='vas-qd' id='vas-qd' filterkey='vas' />
                  <label htmlFor='vas-qd' > Quick Delivery</label>
                </div>
                <div className='filter-option'>
                  <input type='checkbox' name='vas-wl' id='vas-wl' filterkey='vas' />
                  <label htmlFor='vas-wl' > Without Logo</label>
                </div>
              </div>
            </div>
            <div className='filter-group'>
              <div className='filter-label'>
                <h6>Celebrity</h6>
              </div>
              <div className='filter-options'>
                <Autocomplete
                  multiple
                  // id="fixed-tags-demo"
                  value={filterData.celebrity_name}
                  onChange={handleChangeCelebrity}
                  // onKeyDown={handleKeyDownCelebrity}
                  options={['a','b','c']}
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                      option.toLowerCase().startsWith(inputValue.toLowerCase())
                    )
                  }
                  isOptionEqualToValue={() => false}
                  getOptionLabel={(option) => option}
                  // renderTags={(tagValue, getTagProps) =>
                  //   tagValue.map((option, index) => (
                  //     <Chip
                  //       key={index}
                  //       label={option}
                  //       style={{ background: "transparent" }}
                  //     />
                  //   ))
                  // }
                  style={{ width: 500, transition: 'unset' }}
                  renderInput={(params) => (
                    <TextField
                    value={value}
                    onChange={(e)=>setInputValue(e.target.value)}
                      {...params}
                      label="Celebrity"
                      placeholder="Type & Enter To Add New Value"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter