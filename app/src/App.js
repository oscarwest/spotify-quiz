import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SwipeArea from './containers/GameClient/SwipeArea/SwipeArea';
import LoginPage from './containers/GameHost/LoginPage/LoginPage';
import ProfilePage from './containers/GameHost/ProfilePage/ProfilePage';
import HomeComponent from './containers/Home/HomeComponent';
import PlayingContainer from './containers/GameClient/PlayingContainer/PlayingContainer';
import GameHostPage from './containers/GameHost/GameHostPage/GameHostPage';
//import store from './store';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/game" component={SwipeArea} />
      <Route path="/gamehost" component={GameHostPage} />
      <Route path="/playing" component={PlayingContainer} />
      <Route path="/login" component={LoginPage} />
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
