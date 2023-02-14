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
      <Radio {...controlProps('b')} color="secondary" onClick={handleChange} />
    </div>
  );
}