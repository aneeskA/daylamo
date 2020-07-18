import React, { Component } from "react";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import ttiPolyfill from "tti-polyfill";

const browserHistory = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#669933",
    },
    secondary: {
      main: "#d32769",
    },
  },
});

ReactGA.initialize("UA-172920641-1");
ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  // console.log("reactga:timing:", tti);
  ReactGA.timing({
    category: "Load Performance",
    variable: "Time to Interactive",
    value: tti,
  });
});

browserHistory.listen((location) => {
  // console.log("reactga:history:", location);
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </MuiThemeProvider>
    );
  }
}
