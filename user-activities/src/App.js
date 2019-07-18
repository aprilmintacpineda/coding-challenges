import React from 'react';
import { mapStatesToProps } from 'react-fluxible';
import { HashRouter, Route } from 'react-router-dom';

import Dashboard from './routes/Dashboard';
import BoardView from './routes/BoardView';

function App (props) {
  return (
    <>
      <HashRouter>
        <Route exact={true} path="/" component={Dashboard} />
        <Route path="/board/:id" component={BoardView} />
      </HashRouter>
      {props.Popup}
    </>
  );
}

export default mapStatesToProps(App, states => ({
  Popup: states.Popup
}));
