import React from "react";
import { Route, Switch } from "react-router";
import CarDetails  from "./CarDetails/CarDetails";
import CrashDetails from "./CrashDetails/CrashDetails";
import Navbar  from "./Navbar/Navbar";
function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Navbar />
        <CarDetails />
      </Route>

      <Route path="/:id" exact>
        <Navbar />
        <CrashDetails />
      </Route>

      <Route>
        <Navbar />
        <div style={{ textAlign: "center", paddingTop: "35vh" }}>
          <h3>404 Page Not Found</h3>
        </div>
      </Route>
    </Switch>
  );
}

export { Routes };
