import { makeStyles } from '@material-ui/core/styles';
import { isMobile } from '../../common/functions/IsMobile';

const useStyles = makeStyles((theme) => (
  {
    root: {
      backgroundColor: theme.palette.secondary.light,
    },
    circle: {
      height: '70%',
      width: '40%', 
      borderRadius: '50%',
      margin:theme.spacing(9,2,2,2),
      padding: theme.spacing(1,1),
      backgroundColor: 'white',
    },
    logoLarge:{
      height: '50%',
      width: '60%', 
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      margin:theme.spacing(1),
    }, 
    logoText: {
      color: theme.palette.primary.main,
      fontSize: '250%', 
      fontWeight: 500,
    },
    textHeadline:{
      color: theme.palette.primary.main,
      fontSize: '200%', 
      fontWeight: 400,

    },
    howContainer: {
      marginTop: theme.spacing(2),
    },
    companyContainer: {
      marginTop: theme.spacing(2),
    },
    howItem: {
      backgroundColor: 'white',
      margin: theme.spacing(1),
      padding: theme.spacing(1), 
      borderRadius: '2em',

    },
    nextIcon: {
      color: theme.palette.primary.main,
      margin: 'auto'
    },
    questionBox: {
      margin: theme.spacing(1),
      borderRadius: '2em',
      overflow: 'hidden',
      borderColor: theme.palette.secondary.light,
      
    },
    buttonNext:{
      color: 'white',
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(4),
      textTransform: 'none',
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      }
    },
  }));

  export default useStyles;