import { Button, Checkbox, Popover } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import * as React from "react";
import useStyles from "./Styles";
import { List, ListItem } from "@material-ui/core";
import { useState } from "react";

const SuggestionPopover: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [chosenSuggestions, setChosenSuggestions] = useState([false, false, false]);
  const suggestionData = ["Genser", "Bukse", "Gavekort"];

  const open = Boolean(anchorEl);
  const openPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };
  const handleToggle = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const editSuggestion = [...chosenSuggestions];
    editSuggestion[index] = e.target.checked;
    setChosenSuggestions(editSuggestion);
  };
  const resetChosenSuggestions = () => {
    setChosenSuggestions([false, false, false]);
  };
  const submitWishlist = () => {
    setAnchorEl(null);
    resetChosenSuggestions();
  };

  return (
    <>
      <Button onClick={openPopover}>
        Suggestions
        <EmojiObjectsOutlinedIcon />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.suggestionPopover }}
      >
        <List>
          {suggestionData.map((onske, index) => {
            return (
              <ListItem key={index}>
                {onske}
                <Checkbox
                  checked={chosenSuggestions[index]}
                  onChange={handleToggle(index)}
                ></Checkbox>
              </ListItem>
            );
          })}
        </List>
        <Button onClick={submitWishlist}> Add to wishlist </Button>
      </Popover>
    </>
  );
};
export default SuggestionPopover;
