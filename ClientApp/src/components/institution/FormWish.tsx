import { Grid, Typography } from "@material-ui/core";

interface IFormWish {
  cat: string;
  size?: string;
}

interface IWishProps {
  wish: IFormWish;
}

const InstitutionWish: FC<IFormWish> = ({}) => {
  return (
    <Grid>
      <Grid item>
        <Typography> Test</Typography>
      </Grid>
    </Grid>
  );
};
