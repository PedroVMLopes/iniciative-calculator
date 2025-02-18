import React from "react";
import { isElectron } from "../../utils/isElectron";
import { SiDungeonsanddragons } from "react-icons/si";
import { GiRoundBottomFlask } from "react-icons/gi";

function TopBar() {
  // Se não estiver no Electron, não renderiza a barra customizada
  if (!isElectron()) {
    return null;
  }

  // Manipuladores de eventos
  const handleMinimize = () => window.electronAPI.minimize();
  const handleMaximize = () => window.electronAPI.maximize();
  const handleClose = () => window.electronAPI.close();

  return (
    <div className="title-bar" style={styles.titleBar}>
      <div className="title" style={styles.title}>
        <SiDungeonsanddragons />
      </div>
      <div className="window-controls" style={styles.controls}>
        <button style={styles.buttonMinimize} onClick={handleMinimize}>
          <GiRoundBottomFlask />
        </button>
        <button style={styles.buttonMaximize} onClick={handleMaximize}>
          <GiRoundBottomFlask />
        </button>
        <button style={styles.buttonExit} onClick={handleClose}>
          <GiRoundBottomFlask />
        </button>
      </div>
    </div>
  );
}

const styles = {
  titleBar: {
    WebkitAppRegion: "drag",
    backgroundColor: "var(cinza--escuro)",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  },
  title: {
    color: "#FDF0CF",
    fontSize: "18px",
    fontFamily: "cormorant",
    margin: "4px",
    display: "flex",
  },
  controls: {
    display: "flex",
  },
  buttonMinimize: {
    WebkitAppRegion: "no-drag",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    marginLeft: "5px",
    color: "#EFB036",
  },
  buttonMaximize: {
    WebkitAppRegion: "no-drag",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    marginLeft: "5px",
    color: "#77B254",
  },
  buttonExit: {
    WebkitAppRegion: "no-drag",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    marginLeft: "5px",
    color: "#B82132",
  },
};

export default TopBar;
