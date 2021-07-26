import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

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
        </header>
      </div>
    </Router>
  );
}

export default App;
