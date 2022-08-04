import { Button, Checkbox, Popover } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import * as React from "react";
import useStyles from "./Styles";
import { List, ListItem } from "@material-ui/core";
import { useState } from "react";
import { IFormWish } from "./RegistrationFormTypes";

interface props {
  wishObj: IFormWish;
  updateWish: (newWishData: IFormWish) => void;
}

const SuggestionPopover: React.FC<props> = ({ wishObj, updateWish }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [chosenSuggestions, setChosenSuggestions] = useState([false, false]);
  const suggestionData = ["Genser", "Bukse"];

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
    setChosenSuggestions([false, false]);
  };
  const submitWishlist = () => {
    setAnchorEl(null);
    resetChosenSuggestions();

    const wishCopy = { ...wishObj };
    wishCopy.category = 1;
    wishCopy.wish[0] = "Klær";
    wishCopy.wish[1] = "Genser";
    updateWish(wishCopy);
  };

  return (
    <>
      <Button onClick={openPopover}>
        Forslag
        <EmojiObjectsOutlinedIcon />
      </Button>
      <Popover
        open={Boolean(anchorEl)}
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
