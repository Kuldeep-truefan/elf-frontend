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
  console.log(tileName, 'tilename----->>>>> in CCB---');
  const handleChange = (event) => {
    // if (event.target.value === selectedValue ) {
    //     setSelectedValue("");
    //   } else {
    //     setSelectedValue(event.target.value);
    //   }
  };


  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <Checkbox 
        // value="anshul"
        onClick={() => {
          handleChange();
          handleClickAndSendMessage({ video_id: tileName });
        }}
      />
    </div>
  );
}
