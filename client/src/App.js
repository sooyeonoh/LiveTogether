import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";

import LogInPanel from "./components/Authentication/LogInPanel";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Groceries from "./components/Groceries/Groceries";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LogInPanel} />
          <Route path="/signout" component={LogInPanel} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route path="/groceries/:id" component={Groceries} />
        </Switch>
      </div>
  )
}

export default App;
