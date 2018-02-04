import React from 'react';
import { Switch, Route } from 'react-router-dom';
import JoinGame from './containers/JoinGame/JoinGame';
import SwipeArea from './containers/SwipeArea/SwipeArea';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={JoinGame} />
      <Route path="/game" component={SwipeArea} />
    </Switch>
  </main>
);

export default App;
