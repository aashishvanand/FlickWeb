import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    maxWidth: 200,
    flexWrap: 'nowrap',
    overflowX: 'auto',
    margin: theme.spacing(1),
    overflow: 'hidden',
  },
  media: {
    height: 150,
  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden"
  },
  fcContainer: {
    float: "right",
    display: "flex",
    alignItems: "center",
  },
  fcItem: {
    display: "inline-block",
    paddingRight: theme.spacing(5),
  },
  formControl: {
    minWidth: 120,
  },
  button: {
    minWidth: 120,
    height: "55px"
  }

}));