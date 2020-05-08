import React, { Component } from "react";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const browserHistory = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#669933",
    },
    secondary: {
      main: "#d32769"
    },
  },
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
