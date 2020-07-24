import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Gateways from '../Gateways';
import Devices from '../Devices';
import NotFound from '../../components/NotFound';

export default function Content() {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/gateways' component={Gateways} />
      <Route path='/devices' component={Devices} />
      <Route path='/404' component={NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  );
}
