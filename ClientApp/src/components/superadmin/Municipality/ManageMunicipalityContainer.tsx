import { Divider, Grid, Typography } from "@material-ui/core";
import MunicipalityManageTable from "./ManageMunicipality/MunicipalityManageTable";
import MunicipalityInformationContainer from "./MunicipalityInformation/MunicipalityInformationContainer";

interface props {
  accessToken: string;
  assignedLocation: string;
  role: string;
}

const ManageMunicipalityContainer: React.FC<props> = ({ accessToken, role, assignedLocation }) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <MunicipalityManageTable accessToken={accessToken} />
        </Grid>
        <Divider />
        <Grid item style={{ marginTop: "4em" }}>
          <Typography>Nedenfor kan du redigere informasjon om kommunen</Typography>
          <MunicipalityInformationContainer
            accessToken={accessToken}
            role={role}
            assignedLocation={assignedLocation}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ManageMunicipalityContainer;
