import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .status.completed": {
        backgroundColor: "#49a591",
        fontWeight: 500,
      },
      "& .status.waiting": {
        backgroundColor: "#f4cf8a",
        fontWeight: 500,
      },
    },
  })
);

export default useStyles;
