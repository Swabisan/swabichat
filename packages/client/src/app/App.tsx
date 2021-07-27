import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';

import MessagesPage from '../messages/MessagesPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          swabichat
          <Route path="/:username">
            <MessagesPage />
          </Route>
          <Route exact path="/">
            <Redirect to={`/${uniqueNamesGenerator({ dictionaries: [starWars] })}`} />
          </Route>
        </header>
      </div>
    </Router>
  );
}

export default App;
