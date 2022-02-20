import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../Login';
import App from '../App';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/App" component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;