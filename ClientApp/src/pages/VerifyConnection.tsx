import { Button, Container, Grid, Typography } from "@material-ui/core";
import { RouteComponentProps, useParams } from "react-router";
import useStyles from "components/register-as-giver/Styles";
import snowDown from "styling/img/snow_down2.webp";
import snowmanFull from "styling/img/snowmanFull.webp";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import useIsMobile from "hooks/useIsMobile";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}
type VerifyConnection = RouteComponentProps<RouteParameters>;

type ConnectionStatus = "Unknown" | "Connected" | "Disconnected" | "Suggested" | "Mismatch";

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } = useParams<RouteParameters>();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("Unknown");

  const apiservice = new ApiService();
  const isMobile = useIsMobile();

  useEffect(() => {
    onLoad();
  }, []);

  const classes = useStyles();

  const linkUrl = `./${giverRowKey}/${recipientRowKey}/${partitionKey}`;

  const onLoad = () => {
    apiservice
      .get("connection/connectionStatus", {
        params: { giverId: giverRowKey, recipientId: recipientRowKey, event: partitionKey },
      })
      .then((response) => {
        if (response.status == 200) {
          switch (response.data.status) {
            case 1:
              setConnectionStatus("Connected");
              break;

            case 2:
              setConnectionStatus("Disconnected");
              break;

            case 3: // Happy Path
              setConnectionStatus("Suggested");
              break;

            case 4:
              setConnectionStatus("Mismatch");
              break;
          }
          setPageLoaded(true);
        }
      })
      .finally(() => {
        setPageLoaded(true);
      });
  };

  const allreadyConnected = (
    <Container className={classes.verifyDenyConnectionContainer}>
      <Typography className={classes.headingBold}>
        Du har Fått tildelt en familie! <br />
      </Typography>

      <Typography className={classes.paragraph}>
        Det ser ut som at du allerede har godtatt å gi en jul til denne familien, vennligst sjekk
        epostinnboksen om du har fått en videre mail om dette.
      </Typography>
    </Container>
  );

  const connectionError = (
    <Container className={classes.verifyDenyConnectionContainer}>
      <Typography className={classes.headingBold}>
        Det har skjedd en feil! <br />
      </Typography>

      <Typography className={classes.paragraph}>
        Dette kan forekomme av at du allerede har meldt deg av å gi en jul til denne familien.
        Dersom du ikke har meldt deg av og ikke får til å godkjenne at du vil gi en jul til
        familien, ber vi deg ta kontakt med ansvarlig i kommunen du skal gi. Kontaktinfo finnes på{" "}
        <a href="./#contacts">Hovedsiden</a>
      </Typography>
    </Container>
  );

  return (
    <>
      <Container className={classes.fillBackground}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          {pageLoaded && (
            <Grid item xs={isMobile ? 10 : 4}>
              {connectionStatus === "Suggested" && (
                <Container className={classes.verifyDenyConnectionContainer}>
                  <Typography className={classes.headingBold}>
                    Du har Fått tildelt en familie! <br />
                  </Typography>

                  <Typography className={classes.paragraph}>
                    Vennligst bekreft at du har mulighet til å gi en jul til denne familien ved å
                    trykke på &ldquo;Bekreft&rdquo;-knappen under. Dersom du ikke har mulighet vil
                    vi gjerne at du trykker på &ldquo;Avslå&rdquo;-knappen og skriver en liten
                    kommentar.
                  </Typography>
                  <Typography className={classes.spacingBottom}>
                    {" "}
                    Merk at dersom du ønsker en ny familie vil du havne bakerst i køen og vi kan
                    ikke garantere at du vil få tildelt en annen familie.{" "}
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
              )}
              {connectionStatus === "Connected" && allreadyConnected}
              {connectionStatus !== "Connected" &&
                connectionStatus !== "Suggested" &&
                connectionError}
            </Grid>
          )}
          {!isMobile && (
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
