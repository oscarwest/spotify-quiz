import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SwipeArea from './containers/SwipeArea/SwipeArea';
import LoginPage from './containers/LoginPage/LoginPage';
import CallbackPage from './containers/CallbackPage/CallbackPage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import GameComponent from './containers/Game/GameComponent';
import GameHostPage from './containers/GameHostPage/GameHostPage';


const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={GameComponent} />
      <Route path="/game" component={SwipeArea} />
      <Route path="/gamehost" component={GameHostPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/callback" component={CallbackPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  </main>
);

export default App;
