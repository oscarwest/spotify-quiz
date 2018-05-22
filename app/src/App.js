import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SwipeArea from './containers/GameClient/SwipeArea/SwipeArea';
import LoginPage from './containers/GameHost/LoginPage/LoginPage';
import CallbackPage from './containers/GameHost/CallbackPage/CallbackPage';
import ProfilePage from './containers/GameHost/ProfilePage/ProfilePage';
import GameComponent from './containers/GameClient/Game/GameComponent';
import PlayingContainer from './containers/GameClient/PlayingContainer/PlayingContainer';
import GameHostPage from './containers/GameHost/GameHostPage/GameHostPage';
//import store from './store';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={GameComponent} />
      <Route path="/game" component={SwipeArea} />
      <Route path="/gamehost" component={GameHostPage} />
      <Route path="/playing" component={PlayingContainer} />
      <Route path="/login" component={LoginPage} />
      <Route path="/callback" component={CallbackPage} />
      <Route exact path="/profile" component={ProfilePage} />
      {/* <Route exact path="/profile" render={() => (
        store.getState().spotify.userId ? (
          <ProfilePage />
        ) : (
            <Redirect to="/" />
          )
      )} /> */}
    </Switch>
  </main>
);

export default App;
