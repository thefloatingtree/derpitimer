import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Start from '../pages/start/Start'
import Timer from '../pages/timer/Timer'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/timer" component={Timer} />
      </Switch>
    </Router>
  );
}

export default App;
