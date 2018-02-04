import React from 'react';
import { Switch, Route } from 'react-router-dom';
import JoinGame from './containers/JoinGame/JoinGame';
import SwipeArea from './containers/SwipeArea/SwipeArea';
import LoginPage from './containers/LoginPage/LoginPage';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={JoinGame} />
      <Route path="/game" component={SwipeArea} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </main>
);

export default App;
