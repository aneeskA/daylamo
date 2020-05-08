import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Languages from "../../Languages";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Defines from "../../Defines";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: 16,
    marginBottom: 16,
    spacing: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  langBtn: {
    marginBottom: 20,
    minWidth: 150,
    minHeight: 70,
  },
  header: {
    marginBottom: 20,
    fontSize: 30,
  }
}));

export default function LangSrc() {
  const prefix = Defines.Prefix;
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (event) => {
    localStorage.setItem(prefix + "langSrc", event.currentTarget.value);
    setTimeout(() => {
      history.push("/langdst");
    }, 250);
  };
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
          <Typography variant="h4" className={classes.header}>{Defines.Iwantto}</Typography>
          <Grid container>
            {Languages.languages.map((language, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  value={index}
                  onClick={handleClick}
                  className={classes.langBtn}
                >
                  {language.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
      </Grid>
    </div>
  );
}
