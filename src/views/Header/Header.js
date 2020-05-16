import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Defines from "../../Defines";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import About from '@material-ui/icons/EmojiPeople';
import logo from "../../components/logo/logo512w.png"

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 30,
    maxHeight: 30,
  },
  header: {
    marginTop: 10,
    textTransform: "none",
  },
  toolbarButtons: {
    marginLeft: "auto",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
      <Toolbar>
        <IconButton color="inherit" component={RouterLink} to="/">
          <img src={logo} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.header}>
          {Defines.Name}
          </Typography>
        </IconButton>
        
        <div className={classes.toolbarButtons}>
          <IconButton color="inherit" component={RouterLink} to="/about">
            <About />
          </IconButton>
        </div>
      </Toolbar>
  );
}
