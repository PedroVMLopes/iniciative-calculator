import React from "react";

import styles from './reset.css';
import './App.css';
import MenuLateral from './components/MenuLateral/MenuLateral';
import Main from './components/Main/Main';
import { PlayerDataProvider } from "./components/Data/PlayerData";

function App() {
  return (
    <div className="App">
      <PlayerDataProvider>
        <MenuLateral />
        <Main />
      </PlayerDataProvider>
    </div>
    
  );
}

export default App;
