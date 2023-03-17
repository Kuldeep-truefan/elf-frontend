import React, { useEffect, useState } from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import { BASE_URL } from '../../constants/constant';
import useGetCelebsAndOccasions from '../../hooks/useGetCelebsAndOccasions';


const NewRequestFormModal = ({ handleClose }) => {
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
    const {data:celebs} = useGetCelebsAndOccasions('/audio/get-celeb-list')
    const {data:occasions} = useGetCelebsAndOccasions('/audio/get-occasion-list')


    // check for input values, either all fields are filledor not
    const handleInputErr = () => {
        if (!(!!inputValue.video_id && !!inputValue.vas && !!inputValue.request_name && !!inputValue.celeb && !!inputValue.occasion)) {
            setErrMsg('Please enter values for all fields')
            return true
        } else {
            setErrMsg('')
            return false
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValue, [name]: value })
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if there is no error, then submit the data to DB 
        if (!handleInputErr()) {
            setIsUploading(true)
            fetch(`${BASE_URL}/audio/new-video-request`, {
                method: "POST",
                body: JSON.stringify({
                    "videoId": inputValue.video_id,
                    "vas": inputValue.vas,
                    "celeb": inputValue.celeb,
                    "requestName": inputValue.request_name,
                    "occasionName": inputValue.occasion
                }),
                headers: {
                    "Content-type": "application/json;",
                    "Cookie": "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC",
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setCreated(true)
                        setTimeout(() => {
                            handleClose()
                        }, 1000)
                    }else{
                        setErrMsg(`Video ID ${inputValue.video_id} already present, enter correct video ID`)
                    }
                })
                .catch((err) => {
                    setErrMsg(err.message)
                })
                .finally(()=>{
                    setIsUploading(false)
                })

        }
    }

    // useEffect(()=>{
    //     !isLoading &&
    //     console.log(celebs)
    // },[])

    return (
        <div className='popup'>
            <div id='new-request-form'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3 style={{
                        textAlign: 'center'
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
                            {
                                celebs?.map((celeb,index)=>
                                    <MenuItem key={celeb.celeb_id + String(index)} value={celeb.celeb_id}>{celeb.name}</MenuItem>
                                )
                            }
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
                            {
                                occasions?.map((occasion,index)=>
                                    <MenuItem key={occasion.occasion_code + String(index)} value={occasion.occasion_code}>{occasion.occasion}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <div style={{
                        margin: '12px 8px'
                    }}>
                        <button
                            className='primary-btn'
                        >
                            {
                                isUploading ? <>Creating...</>
                                    :
                                    <>Create new request</>
                            }
                        </button>
                        <div style={{
                            color: '#f00'
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
                    <p>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default NewRequestFormModal