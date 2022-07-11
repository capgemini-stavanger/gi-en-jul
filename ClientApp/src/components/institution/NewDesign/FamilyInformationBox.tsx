import { Grid, Typography } from "@material-ui/core";
import useStyles from "../Styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FC } from "react";

interface IFamilyInfo {
  header: string;
  info: string;
}

const FamilyInformationBox: FC<IFamilyInfo> = ({ header, info }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center" className={classes.greenBox}>
      <Grid item xs={3}>
        <Grid container justifyContent="center">
          <Grid item>
            <FavoriteIcon className={classes.greenHeart} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h5">{header}</Typography>
            <Typography>{info}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FamilyInformationBox;
