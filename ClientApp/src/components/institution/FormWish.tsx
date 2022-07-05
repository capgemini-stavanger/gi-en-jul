import { Grid, Typography } from "@material-ui/core";

interface IFormWish {
  cat: string;
  size?: string;
}

interface IWishProps {
  wish: IFormWish;
}

const InstitutionWish = ({}) => {
  return (
    <Grid>
      <Grid item>
        <Typography> Test</Typography>
      </Grid>
    </Grid>
  );
};
export default InstitutionWish;
