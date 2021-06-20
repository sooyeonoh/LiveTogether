import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";

import LogInPanel from "./components/LogInPanel";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LogInPanel} />
          <Route path="/signout" component={LogInPanel} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route exact path="/auth/google/dashboard" component={Dashboard} />
          <Route path="/auth/google/dashboard/:id" component={Dashboard} />
        </Switch>
      </div>
  )
}

export default App;
