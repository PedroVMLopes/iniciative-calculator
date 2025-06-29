import React from "react";
import TopBar from "./components/CustomizedTopBar/TopBar";
import styles from "./reset.css";
import "./App.css";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="flex-row w-full font-cormorant">
      {/* <TopBar /> */}
      <MenuLateral />
      <Main />
    </div>
  );
}

export default App;
