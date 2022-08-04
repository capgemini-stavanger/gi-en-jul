import { Typography, Grid, Divider, Box } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";
import img_placeholder from "styling/img/person.png";
import { isMobile } from "common/functions/IsMobile";

interface Props {
  location: string;
  information: string;
  images: string[];
}

const MunicipalityInformation: React.FC<Props> = ({ location, information, images }) => {
  const classes = useStyles();

  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
  }

  if (isMobile()) {
    return (
      <Grid container direction="column" id="information" className={classes.sectionContainer}>
        <Grid item xs={12}>
          <Typography variant="h5"> {location} kommune:</Typography>
        </Grid>
        <Divider />
        <Grid style={{ marginTop: "1em" }} item xs={12}>
          {parse(information)}
        </Grid>
        <Grid item xs={10}>
          {images.map((img, index) => {
            if (!img) {
              return <></>;
            }
            return (
              <img
                key={index}
                src={img}
                className={classes.infoImageMobile}
                alt={"Finner ikke bildet"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `${img_placeholder}`;
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        direction="column"
        id="information"
        className={classes.sectionContainer}
      >
        <Grid item style={{ marginLeft: "20%", marginBottom: "2em" }}>
          <Typography variant="h5">Informasjon om Gi en jul i {location} kommune:</Typography>
        </Grid>
        <Divider />
        <Grid item xs={8}>
          {parse(information)}
        </Grid>
        <Grid item xs={10}>
          {images.map((img, index) => {
            if (!img) {
              return <></>;
            }
            return (
              <img
                key={index}
                src={img}
                className={classes.infoImage}
                alt={"Finner ikke bildet"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `${img_placeholder}`;
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    );
  }
};

export default MunicipalityInformation;
