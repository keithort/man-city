import React from "react";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";

import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./Components/AuthRoutes/PublicRoutes";

import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import Team from "./Components/Team";

import Dashboard from "./Components/Admin/Dashboard";
import AdminMatches from "./Components/Admin/Matches";
import AddEditMatches from "./Components/Admin/Matches/AddEditMatch";

import AdminPlayers from "./Components/Admin/Players";
import AddEditPlayers from "./Components/Admin/Players/AddEditPlayer";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatches}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatches}
        />
        <PublicRoutes
          {...props}
          path="/"
          exact
          component={Home}
          restricted={false}
        />
        <PublicRoutes
          {...props}
          path="/team"
          exact
          component={Team}
          restricted={false}
        />
        <PublicRoutes
          {...props}
          path="/sign_in"
          exact
          component={SignIn}
          restricted={true}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
