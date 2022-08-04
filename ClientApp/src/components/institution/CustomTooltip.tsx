import { Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import * as React from "react";
import useStyles from "./Styles";

interface ICustomTooltip {
  iconType: boolean;
  content: string;
}

const CustomTooltip: React.FC<ICustomTooltip> = ({ iconType, content }) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip
        placement="top"
        classes={{ tooltip: classes.customTooltip }}
        title={<React.Fragment>{content}</React.Fragment>}
      >
        {iconType ? <InfoOutlinedIcon /> : <HelpOutlineIcon />}
      </Tooltip>
    </>
  );
};
export default CustomTooltip;
