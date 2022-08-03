import { Box, useTheme } from "@material-ui/core";
import { isMobile } from "common/functions/IsMobile";
import useStyles from "components/landing-page/Styles";
import * as React from "react";

interface WaveProps {
  isGreen?: boolean;
}

const WavedSeperator: React.FC<WaveProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = isMobile();
  return (
    <>
      <Box className={props.isGreen ? classes.wavedBoxGreen : classes.wavedBoxWhite}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          height={mobile ? "2em" : "4em"}
          width="100%"
        >
          <path
            d="M0,50 C40,210 65,-100 100,50 L100,00 L0,0 Z"
            style={{
              stroke: "none",
              fill: props.isGreen ? theme.palette.secondary.light : "white",
            }}
          ></path>
        </svg>
      </Box>
    </>
  );
};
export default WavedSeperator;
