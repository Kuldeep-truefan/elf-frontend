import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './filter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useGetCelebsAndOccasions from '../../hooks/useGetCelebsAndOccasions';
import { Chip, TextField } from '@mui/material';

const Filter = forwardRef(({ data:myData, setData }, ref) => {
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    vas: [],
    celebrity_name: null,
    occasion: null
  });

  const celebs = useGetCelebsAndOccasions('/audio/get-celeb-list').data.map((celeb) => celeb.name)
  const occasions = useGetCelebsAndOccasions('/audio/get-occasion-list').data.map((occasion) => occasion.occasion)


  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangeCelebrity = (e, newValue) => {
    setFilterData({ ...filterData, celebrity_name: newValue });
  }
  const handleChangeOccasion = (e, newValue) => {
    setFilterData({...filterData, occasion: newValue });
  }

  const handleChangeVas = (e) => {
    if (filterData.vas.includes(e.target.name)) {
      const newVas = filterData.vas
      const index = newVas.indexOf(e.target.name)
      newVas.splice(index, 1)
      setFilterData({ ...filterData, vas: newVas })
    } else {
      setFilterData({ ...filterData, vas: [...filterData.vas, e.target.name] })
    }
  }

  const handleFilterData = (data=myData) => {
    const filterVas = filterData.vas
    const filteredData = data.filter((tile) => filterVas.every(val => tile.vas.split(',').map(c => c.trim()).includes(val)))
    setData(filteredData)
    if(open) document.getElementById('filter-close-btn').click()
  }

  useImperativeHandle(ref, () => ({
    handleFilterData,
  }));

  // useEffect(()=>{
  //   handleFilterData()
  // },[])

  return (
    <div id='filter'>
      <div onClick={open?handleClose:handleOpen} className='filter-btn' id='filter-close-btn' >{open ? <CancelIcon />:<FilterAltIcon /> }</div>
      <div id='filter-card' className={`${open ? 'opened' : ''}`}>
        <div id='filter-card-wrapper'>
          {/* <div onClick={handleClose} className='filter-btn close-btn' id='filter-close-btn'><CancelIcon /></div> */}
          <div id='filter-card-inner'>
            {/* <h5>Filter</h5> */}
            <div className='filters'>
              <div className='filter-group'>
                <div className='filter-options'>
                  <div className='filter-option'>
                    <input type='checkbox' name='QUICK_DELIVERY' id='vas-qd' onChange={(e) => handleChangeVas(e)} />
                    <label htmlFor='vas-qd' > Quick Delivery <CancelIcon className='cancel-icon' /></label>
                  </div>
                  <div className='filter-option'>
                    <input type='checkbox' name='FULL_NAME' id='vas-fl' onChange={(e) => handleChangeVas(e)} />
                    <label htmlFor='vas-fl' > Full Name <CancelIcon className='cancel-icon' /></label>
                  </div>
                </div>
              </div>
              {/* <div className='filter-group'>
                <div className='filter-options'>
                  <Autocomplete
                    value={filterData.celebrity_name}
                    onChange={handleChangeCelebrity}
                    options={celebs ? celebs : []}
                    filterOptions={(options, { inputValue }) =>
                      options.filter((option) =>
                        option.toLowerCase().startsWith(inputValue.toLowerCase())
                      )
                    }
                    getOptionLabel={(option) => option}
                    style={{ width: 300, transition: 'unset' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Celebrity"
                        placeholder="Search celebrities"
                      />
                    )}
                  />
                </div>
              </div>
              <div className='filter-group'>
                <div className='filter-options'>
                <Autocomplete
                    value={filterData.occasion}
                    onChange={handleChangeOccasion}
                    options={occasions ? occasions : []}
                    filterOptions={(options, { inputValue }) =>
                      options.filter((option) =>
                        option.toLowerCase().startsWith(inputValue.toLowerCase())
                      )
                    }
                    getOptionLabel={(option) => option}
                    style={{ width: 300, transition: 'unset' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Occasion"
                        placeholder="Search occasions"
                      />
                    )}
                  />
                </div>
              </div> */}
            </div>

            <button className='primary-btn filter-now-btn' onClick={() => {
              handleFilterData()
            }}>
              Filter
            </button>

          </div>
        </div>
      </div>
    </div>
  )
});

export default Filter