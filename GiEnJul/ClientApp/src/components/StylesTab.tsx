import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topButton: {
    overflow: 'auto', 
    position: 'fixed', 
    right:    '2%', 
    bottom:   '2%', 
  }, 
  giverButton: {
    overflow: 'auto', 
    position: 'fixed', 
    bottom:   '2%', 
    alignContent: 'center',
    
  }
}));
export default useStyles;