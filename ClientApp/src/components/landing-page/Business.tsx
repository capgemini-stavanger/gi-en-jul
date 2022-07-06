import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "components/landing-page/Styles";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";

interface bedriftInfo {
  question: string;
  info: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
}

const initBedriftInfo: bedriftInfo = {
  question: "",
  info: "",
  partitionKey: "",
  rowKey: "",
  timestamp: "",
};

const Business = () => {
  const classes = useStyles();
  const apiservice = new ApiService();
  const [bedriftInfo, setBedriftInfo] = useState<bedriftInfo>(initBedriftInfo);

  useEffect(() => {
    getBedriftInformation();
  }, []);

  const getBedriftInformation = () => {
    apiservice
      .get("cms/getall", { params: { contentType: "Bedrift" } })
      .then((response) => {
        setBedriftInfo(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <NavBarPublic />
      <Container className={classes.root} maxWidth={false}>
        <div className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>For bedrifter</Typography>
        </div>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography className={classes.sectionContainer}>{parse(bedriftInfo.info)}</Typography>
            <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
            <img className={classes.snowDown} src={snowDown}></img>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Business;
