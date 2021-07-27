import * as React from "react";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { Button, Fab, Zoom } from "@material-ui/core";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import useStyles from "./Styles";

interface ScrollToTopProps {
  maxPagePosition: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ maxPagePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();

  const handleScroll = () => {
    if (window.pageYOffset > maxPagePosition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      onClick={() => {
        scroll.scrollToTop();
      }}
    >
      <Zoom in={isVisible} timeout={200}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          className={classes.toTopButton}
        >
          <ExpandLessRoundedIcon />
        </Fab>
      </Zoom>
    </Button>
  );
};

export default ScrollToTop;
