import { Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import * as React from "react";
import { useEffect, useState } from "react";
import useStyles from "./Styles";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const Footer: React.FC = () => {
  const classes = useStyles();
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const apiservice = new ApiService();

  const fetchActive = () => {
    apiservice.get("municipality/active").then((response) => {
      setMunicipalities(response.data);
    });
  };
  useEffect(() => fetchActive(), []);

  return (
    <>
      <Grid className={classes.footer}>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item>
            <Typography variant="h6" className={classes.footerHeadline}>
              <b>Sider</b>
            </Typography>

            <Grid item direction="column">
              <Link className={classes.footerHeadline} to="/kommune">
                <b>Kommuneinformasjon</b>
              </Link>
              {municipalities.map((municipality, index) => {
                return (
                  <Grid item key={index}>
                    <Link
                      className={classes.footerHeadline}
                      to={`kommune?location=${municipality.toLowerCase()}`}
                    >
                      {municipality}
                    </Link>
                  </Grid>
                );
              })}
              <Grid item>
                <Link className={classes.footerHeadline} to="startjul">
                  Hvordan starte Gi en jul i din kommune
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.footerHeadline} to="/bli-giver">
                  Bli giver
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item direction="column">
            <Typography variant="h6" className={classes.footerHeadline}>
              <b>Hjelp</b>
            </Typography>

            <Grid item>
              <Scroll className={classes.footerHeadline} to="questions">
                <b>FAQs</b>
              </Scroll>
            </Grid>
            <Grid item>
              <Scroll className={classes.footerHeadline} to="contacts">
                <b>Kontakt</b>
              </Scroll>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.footerText}>
            Gi en jul &copy; {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default Footer;
