import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
      value: 1856,
      label: '1856',
    },
    {
      value: 2016,
      label: '2016',
    },
  ];

const valuetext = (value: number) : string => {
  return `${value}`;
}

const RangeSlider : React.FC = () : React.ReactElement => {

  const [value, setValue] = React.useState<number[]>([1856, 2016]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300, pl : 3 }}>
      <Slider
        getAriaLabel={() => 'Ilmestymisvuosi:'}
        name='vuodet'
        min={1856}
        max={2016}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

export default RangeSlider;