import { Button, Container, Grid, Typography } from "@material-ui/core";
import { RouteComponentProps, useParams } from "react-router";
import useStyles from "components/register-as-giver/Styles";
import snowDown from "styling/img/snow_down2.svg";
import snowmanFull from "styling/img/snowmanFull.svg";
import { isMobile } from "common/functions/IsMobile";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}
type VerifyConnection = RouteComponentProps<RouteParameters>;

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } = useParams<RouteParameters>();
  // const [pageLoaded, setPageLoaded] = useState(false);

  const classes = useStyles();

  const linkUrl = `./${giverRowKey}/${recipientRowKey}/${partitionKey}`;

  return (
    <>
      <Container className={classes.fillBackground}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          <Grid item xs={4}>
            <Container className={classes.verifyDenyConnectionContainer}>
              <Typography className={classes.headingBold}>
                Du har Fått tildelt en familie! <br />
              </Typography>

              <Typography className={classes.paragraph}>
                Vennligst bekreft at du har mulighet til å gi en jul til denne familien ved å trykke
                på &ldquo;Bekreft&rdquo;-knappen under. Dersom du ikke har mulighet vil vi gjerne at
                du trykker på &ldquo;Avslå&rdquo;-knappen og skriver en liten kommentar.
              </Typography>
              <Typography className={classes.spacingBottom}>
                {" "}
                Merk at dersom du ønsker en ny familie vil du havne bakerst i køen og vi kan ikke
                garantere at du vil få tildelt en annen familie.{" "}
              </Typography>
              <Grid container justifyContent="space-evenly" style={{ width: "100%" }}>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    href={`${linkUrl}/accepted`}
                  >
                    Bekreft
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" href={`${linkUrl}/denied`}>
                    Avslå
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          {!isMobile() && (
            <Grid item>
              <img className={classes.backgroundImage} src={snowmanFull}></img>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default VerifyConnection;
