// import * as React from 'react';
// import { pink } from '@mui/material/colors';
// import Radio from '@mui/material/Radio';

// export default function ColorCheckboxes() {
//   const [selectedValue, setSelectedValue] = React.useState('a');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedValue(event.target.value);
//   };

//   const controlProps = (item: String) => ({
//     checked: selectedValue === item,
//     onChange: handleChange,
//     value: item,
//     name: 'color-radio-button-demo',
//     inputProps: { 'aria-label': item },
//   });

//   return (
//     <div>
//       <Radio {...controlProps('c')} defaultChecked={false} color="success" />
//     </div>
//   );
// }


import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function ColorCheckboxes() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event) => {
    if (event.target.value === selectedValue ) {
        setSelectedValue("");
      } else {
        setSelectedValue(event.target.value);
      }
    // setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      {/* <Radio {...controlProps('a')} size="small" /> */}
      <Radio {...controlProps('b')} color="secondary" onClick={handleChange} />
      {/* <Radio
        {...controlProps('c')}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }}
      /> */}
    </div>
  );
}