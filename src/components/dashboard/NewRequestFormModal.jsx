import React, { useState } from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';


const NewRequestFormModal = ({handleClose}) => {
    const [inputValue, setInputValues] = useState({
        video_id: '',
        vas: '',
        request_name: '',
        celeb: '',
        occasion: ''
    })

    const [errMsg, setErrMsg] = useState('');
    const [isUploading, setIsUploading] = useState(false)
    const [created, setCreated] = useState(false)


    // check for input values, either all fields are filledor not
    const handleInputErr = ()=>{
        if(!(!!inputValue.video_id && !!inputValue.vas && !!inputValue.request_name && !!inputValue.celeb && !!inputValue.occasion)){
            setErrMsg('Please enter values for all fields')
            return true
        }else{
            setErrMsg('')
            return false
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValue, [name]: value })
    }

    // handle form submit
    const handleSubmit  = (e)=>{
        e.preventDefault();
        
        // if there is no error, then submit the data to DB 
        if(!handleInputErr()){
            fetch()
            .then((res)=>{
                if(res.status === '200' ){
                    setCreated(true)
                    setTimeout(()=>{
                        handleClose()
                    },1000)
                }
            })
            .catch((err)=>{
                setErrMsg(err.message)
            })

        }
    }


    return (
        <div className='popup'>
            <div id='new-request-form'>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h3 style={{
                        textAlign:'center'
                    }}>New Request</h3>

                    <TextField
                        onChange={(e) => handleChange(e)}
                        id="outlined-required"
                        label="Video ID"
                        name='video_id'
                    />
                    <TextField
                        onChange={(e) => handleChange(e)}
                        id="outlined-required"
                        label="VAS"
                        name='vas'
                    />
                    <TextField
                        onChange={(e) => handleChange(e)}
                        id="outlined-required"
                        label="Request Name"
                        name='request_name'
                    />

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="select-status">Celebrity</InputLabel>
                        <Select
                            labelId="select-status"
                            value={inputValue.celeb}
                            label="Status"
                            onChange={(e) => handleChange(e)}
                            name='celeb'
                        >
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="select-status">Occasion</InputLabel>
                        <Select
                            labelId="select-status"
                            value={inputValue.occasion}
                            label="Status"
                            onChange={(e) => handleChange(e)}
                            name='occasion'
                        >
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{
                        margin:'12px 8px'
                    }}>
                        <button
                        className='primary-btn'
                        >
                            {
                                isUploading? <>Creating...</>
                                :
                                <>Create new request</>
                            }
                        </button>
                        <div style={{
                            color:'#f00'
                        }}>
                            <small ><i>{errMsg}</i></small>
                        </div>
                    </div>
                        {
                            created &&
                            <div className='success-msg'>
                                <p>Request created successfully!</p>
                            </div>
                        }

                </form>
            </div>
        </div>
    )
}

export default NewRequestFormModal