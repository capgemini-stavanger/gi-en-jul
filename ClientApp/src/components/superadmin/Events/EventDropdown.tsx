import { Box, FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import { ChangeEvent } from "react";

interface Props {
  choices: string[];
  labelNote: string;
  updateValue: (value: string) => void;
  selectedValue: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const EventDropdown: React.FC<Props> = ({ choices, labelNote, updateValue, selectedValue }) => {
  const handleChange = (event: ChangeEvent<IChangeEvent>) => {
    updateValue(event.target.value as string);
  };
  // adding "" as an option for the dropdown
  const menuItems = ["", ...choices].map((object, index) => {
    return (
      <MenuItem key={index} value={object}>
        {object}
      </MenuItem>
    );
  });

  return (
    <Box width="250px">
      <FormControl fullWidth>
        <Typography>{labelNote}</Typography>
        {/* <InputLabel id="demo-simple-select-label">{labelNote}</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={labelNote}
          onChange={handleChange}
          fullWidth
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};
export default EventDropdown;
