import { Grid, Typography } from "@material-ui/core";
import * as React from "react";
import useStyles from "./Styles";
import { Link } from "react-router-dom";
import municipalitiesContext from "contexts/municipalitiesContext";

const Footer: React.FC = () => {
  const classes = useStyles();
  const municipalities = React.useContext(municipalitiesContext);

  return (
    <Grid container direction="column" className={classes.footer}>
      <Grid item>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6" className={classes.footerHeadline}>
                  <b>Sider</b>
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Link className={classes.footerHeadline} to="/kommune">
                      <b>Kommuneinformasjon</b>
                    </Link>
                  </Grid>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6" className={classes.footerHeadline}>
                  <b>Hjelp</b>
                </Typography>
              </Grid>
              <Grid item>
                <Link className={classes.footerHeadline} to="startjul">
                  Hvordan starte Gi en jul i din kommune
                </Link>
              </Grid>
              <Grid item>
                <a className={classes.footerHeadline} href="/#questions">
                  FAQs
                </a>
              </Grid>
              <Grid item>
                <a className={classes.footerHeadline} href="/#contacts">
                  Kontakt
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.footerText}>
          Gi en jul &copy; {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Footer;
