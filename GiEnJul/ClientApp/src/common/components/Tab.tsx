import * as React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { Button } from "@material-ui/core";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import useStyles from "./StylesTab";

interface TabProps {
  maxPagePosition: number;
  path: string;
}

const Tab: React.FC<TabProps> = ({ maxPagePosition, path }) => {
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

    // Clean up when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isVisible) {
    if (path === "top") {
      return (
        <Button
          className={classes.topButton}
          onClick={() => {
            scroll.scrollToTop();
          }}
        >
          <ExpandLessRoundedIcon></ExpandLessRoundedIcon>
        </Button>
      );
    } else {
      return (
        <Route
          render={({ history }) => (
            <Button
              size="large"
              variant="contained"
              className={classes.giverButton}
              onClick={() => {
                history.push(path);
              }}
            >
              Bli giver
            </Button>
          )}
        />
      );
    }
  } else {
    return null;
  }
};
export default Tab;
