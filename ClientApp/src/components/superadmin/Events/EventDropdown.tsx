import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

interface Props {
  choices: string[];
  labelNote: string;
  passSelectedValue: (value: string) => void;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const EventDropdown: React.FC<Props> = ({ choices, labelNote, passSelectedValue }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleChange = (event: ChangeEvent<IChangeEvent>) => {
    setSelectedValue(event.target.value as string);
    passSelectedValue(event.target.value as string);
  };
  const menuItems = choices.map((object, index) => {
    return (
      <MenuItem key={index} value={object}>
        {object}
      </MenuItem>
    );
  });

  return (
    <Box width="250px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{labelNote}</InputLabel>
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
