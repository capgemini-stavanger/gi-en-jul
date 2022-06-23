import {
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { FormatAlignJustify } from "@material-ui/icons";
import useStyles from "./Styles";


const Start = () => {
    const classes = useStyles();


return (
    <Container id="start" className={classes.sectionContainer}>
        <div className={classes.headLineContainer}>
            <Typography className={classes.textHeadline}>
                Hvordan du starter Gi en Jul i din kommune 
            </Typography>
        </div>
        <Grid container justifyContent="center">
            <div>
                <Typography>
                    Du kan ringe Karianne. 
                </Typography>
            </div>
        </Grid>
    </Container>
    );
};

export default Start;
