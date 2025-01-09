import React, { useState } from "react";
import MenuAddPlayer from "../MenuAddPlayer/MenuAddPlayer";

export default function BotaoAdicionarJogador() {
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  const toggleExpandPlayer = () => {
    setIsPlayerExpanded((prevState) => !prevState);
  };

  return (
    <div className="botoes-adicionar">
      <button
        className="botao-adicionar botao-adicionar-player"
        onClick={toggleExpandPlayer}
      >
        Adicionar Jogador
      </button>
      {isPlayerExpanded && <MenuAddPlayer />}
    </div>
  );
}
