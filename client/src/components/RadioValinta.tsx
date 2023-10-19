import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioValinta : React.FC = () : React.ReactElement => {

  return (
    <FormControl>
      <FormLabel id="radioValinta">Haun kohde:</FormLabel>
      <RadioGroup
        defaultValue="asiasanat"
        name="kohde"
      >
        <FormControlLabel value="asiasanat" control={<Radio />} label="Asiasanat" />
        <FormControlLabel value="merkinNimi" control={<Radio />} label="Merkin nimi" />
        <FormControlLabel value="taiteilija" control={<Radio />} label="Taiteilija" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioValinta;