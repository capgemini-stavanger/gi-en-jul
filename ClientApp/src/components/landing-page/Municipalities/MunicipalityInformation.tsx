import { Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";
import { useState } from "react";
import img_placeholder from "styling/img/person.png";

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

  return (
    <Grid container direction="column" id="information" className={classes.sectionContainer}>
      <Grid item>
        <Typography variant="h5">Informasjon om Gi en jul i {location} kommune:</Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{parse(information)}</Typography>
      </Grid>
      <Grid item>
        {images.map((img, index) => {
          if (!img) {
            return <></>;
          }
          return (
            <img
              key={index.toString() + img}
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
};

export default MunicipalityInformation;
