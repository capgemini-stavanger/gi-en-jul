import { Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";
import img_placeholder from "styling/img/person.png";
import useIsMobile from "hooks/useIsMobile";

interface Props {
  location: string;
  information: string;
  images: string[];
}

const MunicipalityInformation: React.FC<Props> = ({ location, information, images }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();

  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
  }
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      direction="column"
      id="information"
      className={classes.sectionContainer}
    >
      <Grid item style={isMobile ? { marginBottom: "1em" } : { margin: "0 auto 2em auto" }}>
        <Typography variant="h5">
          {isMobile ? "" : "Informasjon om Gi en jul i "}
          {location} kommune:
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        {parse(information)}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-evenly">
          {images.map((img, index) => {
            if (!img) {
              return <></>;
            }
            return (
              <Grid item key={`img${index}`}>
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
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MunicipalityInformation;
