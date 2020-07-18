import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: 26,
    marginBottom: 16,
    spacing: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  content: {
    marginBottom: 20,
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 8,
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Header />
      </AppBar>
      {/* Show language selection */}
      <Grid container spacing={3}>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid
          item
          xs={10}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          component={Card}
          className={classes.card}
        >
          <Typography className={classes.content}>
            This tool was born out of a necessity to learn to read Kannada by a
            Malayali living in Bangalore. Since this Malayali knew Malayalam, it
            made sense to his lazy bones to (ab)use that advantage. He called it{" "}
            <b>
              <i>daylamo</i>
            </b>{" "}
            (with a lot of help from his brother).
            <br />
            <br />
            <b>
              <i>daylamo</i>
            </b>{" "}
            helps the user to learn to <u>read</u> any
            <b>
              <sup>*</sup>
            </b>{" "}
            Indian language using the one(s) they know already. For example, if
            you are a Malayali living in Bangalore, it shows Kannada alphabets
            alongside its equivalent sounding Malayalam alphabet. This, the
            author has discovered, significantly improves the learning velocity
            <sup>
              <Link
                target="_blank"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                patent-pending
              </Link>
            </sup>
            .
            <br />
            <br />
            Hope this tool helps you too.
            <br />
            <br />
            <Link target="_blank" href="https://www.linkedin.com/in/aneeska/">
              aneeskA
            </Link>
            , creator
            <br />
          </Typography>
        </Grid>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid
          item
          xs={10}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          component={Card}
          className={classes.card}
        >
          <Typography className={classes.content}>
            <h4>Credits</h4>
            <Link target="_blank" href="https://www.linkedin.com/in/anaska/">
              Anas K A
            </Link>
            , UX
            <br />
          </Typography>
        </Grid>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
      </Grid>
    </div>
  );
}
