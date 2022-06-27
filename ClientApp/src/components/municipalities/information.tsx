import * as React from "react";
import {
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./Styles";

//få inn en string som input fra admin som skal være informasjonen om kommunen?


const Information = () => {
    const classes = useStyles();

    return(
        <Container id="information" className={classes.sectionContainer}>
            <div>
                <Typography>Her skal det stå informasjon om kommunen.</Typography>
            </div>
        </Container>
    );
};

export default Information;