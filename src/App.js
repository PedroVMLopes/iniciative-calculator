import React from "react";

import styles from "./reset.css";
import "./App.css";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="flex-row w-full">
      <MenuLateral />
      <Main />
    </div>
  );
}

export default App;
