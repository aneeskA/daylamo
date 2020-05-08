import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.text.secondary,
    marginTop: 30,
    fontSize: 10,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.footer}>
      <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
      <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
          created by <Link target="_blank" href="https://www.linkedin.com/in/aneeska/">aneeskA</Link>
      </Grid>
      <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
    </Grid>
  );
}
