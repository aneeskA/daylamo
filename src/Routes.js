import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Daylamo from "./views/Daylamo";
import LangSrc from "./views/LangSrc";
import LangDst from "./views/LangDst";
import About from "./views/About";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/app" />
      <Route path="/app">
        <Daylamo />
      </Route>
      <Route path="/langsrc">
        <LangSrc />
      </Route>
      <Route path="/langdst">
        <LangDst />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Redirect to="/app" />
    </Switch>
  );
};

export default Routes;
