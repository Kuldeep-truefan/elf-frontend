import * as React from "react";
import Radio from "@mui/material/Radio";
import Login from "../../pages/Login";
import { useEffect, useState, useCallback } from "react";
import Checkbox from '@mui/material/Checkbox';
export default function ColorCheckboxes({
  tileName,
  handleClickAndSendMessage,
}) {
  const [selectedValue, setSelectedValue] = useState("a");
  const handleChange = (event) => {
    // if (event.target.value === selectedValue ) {
    //     setSelectedValue("");
    //   } else {
    //     setSelectedValue(event.target.value);
    //   }
  };


  const controlProps = (item) => ({
    checked: selectedValue === item,
    // onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div style={
      {
        display:'inline-flex'
      }
    }>
      <input type="checkbox" id={tileName.split("_")[3]}
      className="input-checkbox"
        onClick={(e) => {
          // handleChange();
          if (e.target.checked != true){
            handleClickAndSendMessage({ video_id: tileName, true: true});
          }
          else{
          handleClickAndSendMessage({ video_id: tileName});
          }
        }}
      />
      <label htmlFor={tileName.split("_")[3]}>
        <div className='checkbox'>
          <div className='checkbox-btn'>
          
          </div>
        </div>
      </label>
    </div>
  );
}









